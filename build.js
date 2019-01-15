const { writeFile, readFileSync } = require('fs')
const yaml = require('js-yaml')

function themeBuilder(folder, outputFile) {
  // Panda theme color definition
  let themeColors = yaml.safeLoad(readFileSync(folder + '/colors.yaml', 'utf-8'));
  // Base has the syntax tokens applicable across multiple languages
  let base = yaml.safeLoad(readFileSync(folder + '/base.yaml', 'utf-8'));
  // Additional theme definitions to combine with base syntax token styles
  let workbench = yaml.safeLoad(readFileSync(folder + '/workbench.yaml', 'utf-8'));
  let template = yaml.safeLoad(readFileSync(folder + '/template.yaml', 'utf-8'));
  let markdown = yaml.safeLoad(readFileSync(folder + '/markdown.yaml', 'utf-8'));
  let hexdump = yaml.safeLoad(readFileSync(folder + '/hexdump.yaml', 'utf-8'));
  let html = yaml.safeLoad(readFileSync(folder + '/html.yaml', 'utf-8'));
  let css = yaml.safeLoad(readFileSync(folder + '/css.yaml', 'utf-8'));
  let cpp = yaml.safeLoad(readFileSync(folder + '/cpp.yaml', 'utf-8'));
  let regex = yaml.safeLoad(readFileSync(folder + '/regex.yaml', 'utf-8'));
  let json = yaml.safeLoad(readFileSync(folder + '/json.yaml', 'utf-8'));
  let jsdoc = yaml.safeLoad(readFileSync(folder + '/jsdoc.yaml', 'utf-8'));
  // Merge workbench styles
  Object.assign(base, workbench);
  // Merge additional syntax token styles
  base.tokenColors = base.tokenColors.concat(
    template,
    markdown,
    hexdump,
    html,
    css,
    cpp,
    regex,
    json,
    jsdoc
  );

  // Stringify all of the combined theme styles so we can run string regexes on it to
  // replace color variables with color values
  base = JSON.stringify(base, null, 2);

  for (let color in themeColors) {
    base = base.replace(new RegExp(color + '"', 'g'), themeColors[color] + '"');
  }

  // Base file has been extended with additional theme styles and color variables have
  // been replaced with Panda theme values. Write to /dist for consumption.
  writeFile('dist/' + outputFile + '.json', base, err => {
    if (err) {
      console.warn(err);
    }
    console.log('Build finished: ' + outputFile);
  });
}

themeBuilder('default', 'RetroFuture');
