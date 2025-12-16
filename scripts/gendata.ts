import fs from "fs-extra";
import path from "path";
import { parse } from "csv-parse/sync";
import type { Question, QuestionGroup } from "../app/types/questions";
import type { AxisBounds } from "../app/types/bound";

const DATA_DIR = path.resolve("data");
const OUT_DIR = path.resolve("app/assets/generated");
const GROUPS_FILE = path.join(DATA_DIR, "groups.json");

const parseNumber = (val: string | undefined) => (val ? parseFloat(val) : 0);

async function main() {
  await fs.ensureDir(OUT_DIR);

  const groupsConfig: QuestionGroup[] = await fs.readJson(GROUPS_FILE);
  const processedGroups: QuestionGroup[] = [];
  const axisBounds: Record<string, AxisBounds> = {};

  let globalQuestionId = 1;

  for (const group of groupsConfig) {
    const csvPath = path.join(DATA_DIR, "questions", `${group.data}.csv`);

    if (!fs.existsSync(csvPath)) {
      console.warn(`Warning: CSV not found at ${csvPath}`);
      continue;
    }

    const csvContent = await fs.readFile(csvPath, "utf-8");
    // Using loose mode to handle variable columns
    const records = parse(csvContent, {
      relax_column_count: true,
      trim: true,
      skip_empty_lines: true,
    }) as string[][];

    const questions: Question[] = records.map((row) => {
      const weights: Record<string, number> = {};

      // Pattern: Text, Axis, Val, Axis, Val...
      const text = row[0];
      for (let i = 1; i < row.length; i += 2) {
        const axis = row[i];
        const val = parseNumber(row[i + 1]);
        if (axis && val !== 0) {
          weights[axis] = val;
        }
      }

      return {
        id: `q_${globalQuestionId++}`,
        text,
        weights,
      };
    });

    processedGroups.push({
      title: group.title,
      data: questions,
    });

    questions.forEach((q) => {
      Object.entries(q.weights).forEach(([axis, weight]) => {
        if (!axisBounds[axis]) axisBounds[axis] = { min: 0, max: 0 };
        if (weight > 0) {
          axisBounds[axis].max += weight * 2;
        } else {
          axisBounds[axis].max += Math.abs(weight) * 2;
        }

        if (weight > 0) {
          axisBounds[axis].min -= weight * 2;
        } else {
          axisBounds[axis].min -= Math.abs(weight) * 2;
        }
      });
    });
  }

  await fs.writeJson(path.join(OUT_DIR, "questions.json"), processedGroups);
  await fs.writeJson(path.join(OUT_DIR, "bounds.json"), axisBounds);

  console.log("Data generation complete.");
  console.log(
    `Groups: ${processedGroups.length}, Axes: ${Object.keys(axisBounds).join(", ")}`,
  );
}

main().catch(console.error);
