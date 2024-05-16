import * as vscode from "vscode";
const fs = require("fs");
const Mustache = require("mustache");

import { tsxStr, lessStr } from "./template";

function createComponent(path: string, lessType?: "default" | "module") {
  vscode.window.showInputBox().then((componentName) => {
    if (!componentName) {
      return;
    }
    if (!/^([A-Z])/.test(componentName)) {
      vscode.window.showErrorMessage("组件名请用大写开头！");
      return;
    }
    const className = componentName.replace(/^([A-Z])/, (match) => {
      return match.toLocaleLowerCase();
    });

    const suffix = lessType === "module" ? ".module" : "";
    const tsxString = Mustache.render(tsxStr, {
      componentName,
      className,
      suffix,
    });
    const lessString = Mustache.render(lessStr, { className });
    fs.mkdirSync(`${path}\\${componentName}`, () => {});
    fs.writeFileSync(
      `${path}\\${componentName}\\index.tsx`,
      tsxString,
      (err: any) => {
        vscode.window.showErrorMessage(err);
      }
    );
    fs.writeFileSync(
      `${path}\\${componentName}\\index${suffix}.less`,
      lessString,
      (err: any) => {
        vscode.window.showErrorMessage(err);
      }
    );
    vscode.window.showInformationMessage(`${componentName} 组件新建成功！`);
  });
}

export function activate(context: vscode.ExtensionContext) {
  console.log("简单编码已加载！");

  const createReactComponent = vscode.commands.registerCommand(
    "easy-coding.createReactComponent",
    (res) => {
      createComponent(res.fsPath);
    }
  );

  const createReactComponentWithModuleLess = vscode.commands.registerCommand(
    "easy-coding.createReactComponentWithModuleLess",
    (res) => {
      createComponent(res.fsPath, "module");
    }
  );

  context.subscriptions.push(
    createReactComponent,
    createReactComponentWithModuleLess
  );
}

export function deactivate() {}
