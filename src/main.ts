import * as core from '@actions/core';
import { readFileSync, readdirSync } from 'fs';
async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('LINKEDIN_TOKEN');
    core.debug(`LinkedIn Token received: ${ms}`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    try {
      let dirFiles = readdirSync('/');
      dirFiles.map((file) => {
        core.info(file);
      });
    } catch (error) {

    }
    let content: string = readFileSync('/README.md').toString();
    
    content = content.replace(/<[^>]*>/g, '')
      // Remove setext-style headers
      .replace(/^[=\-]{2,}\s*$/g, '')
      // Remove footnotes?
      .replace(/\[\^.+?\](\: .*?$)?/g, '')
      .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
      // Remove images
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, '')
      // Remove inline links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
      // Remove blockquotes
      .replace(/^\s{0,3}>\s?/g, '')
      // Remove reference-style links?
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
      // Remove atx-style headers
      .replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm, '$1$2$3')
      // Remove emphasis (repeat the line to remove double emphasis)
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
      // Remove code blocks
      .replace(/(`{3,})(.*?)\1/gm, '$2')
      // Remove inline code
      .replace(/`(.+?)`/g, '$1')
      // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
      .replace(/\n{2,}/g, '\n\n');

    core.setOutput('ReadMe', content);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run()
