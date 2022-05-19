import { TypingObject } from '../App';

const ParseString = (str: string) => {
  const obj: TypingObject = {
    command: '',
    console: [],
    res: [],
  }
  const regexpCode = /<c>((?!<cons>|<res>|<c>).)*<c>/g;
  const regexpConsole = /<cons>((?!<c>|<res>|<cons>).)*<cons>/g;
  const regexpResult = /<res>((?!<cons>|<c>|<res>).)*<res>/g;
  const arrayOfCommands = str.match(regexpCode);
  obj.command = arrayOfCommands ? arrayOfCommands[0].split('<c>')[1] : '';
  const arrayOfConsole = str.match(regexpConsole);
  if(arrayOfConsole) {
    arrayOfConsole.forEach((i: any) => {
      obj.console.push(i.split('<cons>')[1])
    })
  }
  const arrayOfResult = str.match(regexpResult);
  if(arrayOfResult) {
    arrayOfResult.forEach((i: any) => {
      obj.res.push(i.split('<res>')[1])
    })
  }
  return obj;
}


export default ParseString