#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const frameworkTemplates = {
  nextjs: {
    name: "Next.js",
    folders: [
      {
        name: "components",
        description: "Reusable UI components",
        checked: true,
      },
      {
        name: "app",
        description: "App Router pages (Next.js 13+)",
        checked: true,
      },
      { name: "pages", description: "Pages Router (Legacy)", checked: false },
      { name: "public", description: "Static assets", checked: true },
      { name: "styles", description: "CSS/SCSS files", checked: true },
      { name: "lib", description: "Utility functions", checked: true },
      { name: "hooks", description: "Custom React hooks", checked: true },
      { name: "services", description: "API services", checked: true },
      { name: "types", description: "TypeScript types", checked: true },
      { name: "store", description: "State management", checked: false },
      { name: "middleware", description: "Next.js middleware", checked: false },
      { name: "constants", description: "App constants", checked: true },
    ],
  },
  react: {
    name: "React",
    folders: [
      { name: "components", description: "Reusable components", checked: true },
      { name: "pages", description: "Page components", checked: true },
      { name: "layouts", description: "Layout wrappers", checked: true },
      { name: "hooks", description: "Custom hooks", checked: true },
      { name: "services", description: "API calls", checked: true },
      { name: "utils", description: "Helper functions", checked: true },
      { name: "store", description: "Redux/Zustand", checked: false },
      { name: "context", description: "React Context", checked: false },
      { name: "types", description: "TypeScript types", checked: true },
      { name: "assets", description: "Images, fonts", checked: true },
      { name: "constants", description: "Config values", checked: true },
      { name: "routes", description: "Route definitions", checked: true },
    ],
  },
  vite: {
    name: "Vite (React/Vue)",
    folders: [
      { name: "components", description: "UI components", checked: true },
      { name: "views", description: "Page views", checked: true },
      { name: "layouts", description: "Layouts", checked: true },
      {
        name: "composables",
        description: "Vue composables/React hooks",
        checked: true,
      },
      { name: "services", description: "API services", checked: true },
      { name: "utils", description: "Utilities", checked: true },
      { name: "store", description: "Pinia/Redux", checked: false },
      { name: "types", description: "TypeScript types", checked: true },
      { name: "assets", description: "Static assets", checked: true },
      { name: "styles", description: "Global styles", checked: true },
      { name: "router", description: "Router config", checked: true },
      { name: "plugins", description: "Vite plugins", checked: false },
    ],
  },
  custom: {
    name: "Custom",
    folders: [
      { name: "components", description: "UI Components", checked: true },
      { name: "pages", description: "Page components", checked: true },
      { name: "layouts", description: "Layout wrappers", checked: false },
      { name: "hooks", description: "Custom hooks", checked: true },
      { name: "services", description: "API services", checked: true },
      { name: "utils", description: "Helper functions", checked: true },
      { name: "store", description: "State management", checked: false },
      { name: "types", description: "TypeScript types", checked: true },
      { name: "assets", description: "Images, fonts", checked: true },
      { name: "constants", description: "Constants", checked: true },
      { name: "config", description: "Configuration files", checked: false },
      { name: "lib", description: "Library code", checked: false },
      { name: "api", description: "API routes", checked: false },
      { name: "models", description: "Data models", checked: false },
      { name: "context", description: "React Context", checked: false },
    ],
  },
};

async function init() {
  console.log(chalk.blue.bold("\n🚀  Clean Architecture Generator\n"));
  console.log(
    chalk.gray("Generate clean, scalable folder structures for your projects\n")
  );

  try {
    const frameworkAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "Pilih framework/template yang kamu gunakan:",
        choices: [
          { name: "⚡ Next.js (React dengan App Router)", value: "nextjs" },
          { name: "⚛️  React (Create React App / React)", value: "react" },
          { name: "🚀 Vite (React/Vue)", value: "vite" },
          { name: "🎯 Custom (Pilih sendiri)", value: "custom" },
        ],
        default: "react",
      },
    ]);

    const selectedTemplate = frameworkTemplates[frameworkAnswer.framework];

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "basePath",
        message: "Di mana kamu ingin membuat folder-folder ini?",
        choices: [
          { name: "Di root folder ini (./)", value: "." },
          { name: "Di dalam folder src (./src)", value: "src" },
          { name: "Di dalam folder app (./app)", value: "app" },
        ],
        default: "src",
      },
      {
        type: "checkbox",
        name: "folders",
        message: `Pilih folder untuk ${selectedTemplate.name} (Spasi = pilih, Enter = konfirmasi):`,
        choices: selectedTemplate.folders.map((folder) => ({
          name: `${folder.name} - ${folder.description}`,
          value: folder.name,
          checked: folder.checked,
        })),
        validate: (answer) => {
          if (answer.length < 1) {
            return "Kamu harus memilih minimal satu folder!";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "fileExtension",
        message: "Pilih ekstensi file index:",
        choices: [
          { name: "TypeScript (.ts/.tsx)", value: "ts" },
          { name: "JavaScript (.js/.jsx)", value: "js" },
          { name: "Tidak perlu file index", value: "none" },
        ],
        default: "ts",
      },
      {
        type: "confirm",
        name: "addReadme",
        message: "Tambahkan README.md di setiap folder?",
        default: false,
        when: (answers) => answers.fileExtension !== "none",
      },
      {
        type: "confirm",
        name: "addGitkeep",
        message: "Tambahkan .gitkeep untuk folder kosong?",
        default: true,
      },
    ]);

    const cwd = process.cwd();
    const targetBase = path.join(cwd, answers.basePath);

    console.log(chalk.yellow("\n📦 Sedang membuat struktur folder... 🛠️\n"));

    let createdCount = 0;
    let skippedCount = 0;

    for (const folder of answers.folders) {
      const dirPath = path.join(targetBase, folder);

      if (!fs.existsSync(dirPath)) {
        await fs.ensureDir(dirPath);
        console.log(
          `${chalk.green("✔ Created:")} ${answers.basePath}/${folder}`
        );
        createdCount++;

        if (answers.fileExtension !== "none") {
          const ext = answers.fileExtension;
          const filePath = path.join(dirPath, `index.${ext}`);
          await fs.writeFile(
            filePath,
            `// Export ${folder} here\nexport {};\n`
          );
        }

        if (answers.addReadme) {
          const readmePath = path.join(dirPath, "README.md");
          await fs.writeFile(
            readmePath,
            `# ${
              folder.charAt(0).toUpperCase() + folder.slice(1)
            }\n\nThis folder contains ${
              selectedTemplate.folders.find((f) => f.name === folder)
                ?.description || folder
            }.\n`
          );
        }

        if (answers.addGitkeep) {
          const gitkeepPath = path.join(dirPath, ".gitkeep");
          await fs.writeFile(gitkeepPath, "");
        }
      } else {
        console.log(
          `${chalk.yellow("⚠ Skipped:")} ${
            answers.basePath
          }/${folder} (sudah ada)`
        );
        skippedCount++;
      }
    }

    console.log(chalk.blue.bold("\n✅ Selesai!\n"));
    console.log(chalk.green(`📁 ${createdCount} folder berhasil dibuat`));
    if (skippedCount > 0) {
      console.log(
        chalk.yellow(`⚠️  ${skippedCount} folder dilewati (sudah ada)`)
      );
    }
    console.log(chalk.gray(`\n📍 Lokasi: ${path.resolve(targetBase)}\n`));
  } catch (error) {
    if (error.isTtyError) {
      console.log(chalk.red("❌ Prompt tidak bisa dirender di terminal ini."));
    } else {
      console.log(chalk.red("❌ Terjadi kesalahan: ", error.message));
    }
    process.exit(1);
  }
}

init();
