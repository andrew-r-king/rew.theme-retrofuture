import { writeFile, readFileSync } from "fs";
import yaml from "js-yaml";

const buildTheme = (inFolder: string, inOutputFile: string): void => {
    const yamlFile: any = (file: string): any => {
        return yaml.safeLoad(readFileSync(`./src/${inFolder}/${file}.yaml`, "utf-8"));
    };

    const themeColors = yamlFile("colors");
    const workbench = yamlFile("workbench");

    let base = yamlFile("base");
    Object.assign(base, workbench);

    base.tokenColors = base.tokenColors.concat(
        yamlFile("cmake"),
        yamlFile("cpp"),
        yamlFile("csharp"),
        yamlFile("css"),
        yamlFile("diff"),
        yamlFile("env"),
        yamlFile("glsl"),
        yamlFile("graphql"),
        yamlFile("hexdump"),
        yamlFile("javascript"),
        yamlFile("jsdoc"),
        yamlFile("json"),
        yamlFile("lua"),
        yamlFile("makefile"),
        yamlFile("markdown"),
        yamlFile("ninja"),
        yamlFile("python"),
        yamlFile("qtqml"),
        yamlFile("regex"),
        yamlFile("shell"),
        yamlFile("typescript"),
        yamlFile("yaml")
    );

    base = JSON.stringify(base, null, 0);

    for (const color in themeColors) {
        const re = new RegExp(color + '"', "g");
        base = base.replace(re, themeColors[color] + '"');
    }

    writeFile("./dist/" + inOutputFile + ".json", base, (err) => {
        if (err) console.warn(err);

        console.log("Build finished: " + inOutputFile);
    });
};

buildTheme("default", "RetroFuture");
