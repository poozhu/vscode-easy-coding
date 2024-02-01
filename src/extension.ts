import * as vscode from "vscode";
const fs = require("fs");
const Mustache = require("mustache");

import { tsxStr, lessStr } from "./template";

export function activate(context: vscode.ExtensionContext) {
  console.log("简单编码已加载！");

  const createReactComponent = vscode.commands.registerCommand(
    "easy-coding.createReactComponent",
    (res) => {
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

        const tsxString = Mustache.render(tsxStr, { componentName, className });
        const lessString = Mustache.render(lessStr, { className });
        fs.mkdirSync(`${res.fsPath}\\${componentName}`, () => {});
        fs.writeFileSync(
          `${res.fsPath}\\${componentName}\\index.tsx`,
          tsxString,
          (err: any) => {
            vscode.window.showErrorMessage(err);
          }
        );
        fs.writeFileSync(
          `${res.fsPath}\\${componentName}\\index.less`,
          lessString,
          (err: any) => {
            vscode.window.showErrorMessage(err);
          }
        );
        vscode.window.showInformationMessage(`${componentName} 组件新建成功！`);
      });
    }
  );

  context.subscriptions.push(createReactComponent);
}

export function deactivate() {}
