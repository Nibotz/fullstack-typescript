export const ParseArgumentsToNumbers = (
  minArgCount: number,
  args: string[]
) => {
  if (args.length < minArgCount) {
    throw new Error(
      `Expected at least ${minArgCount} arguments but got only ${args.length}.`
    );
  }
  const argsNums = args.map((a) => Number(a));
  if (argsNums.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }
  return argsNums;
};
