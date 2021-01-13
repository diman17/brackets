module.exports = function check(str, bracketsConfig) {
    let openBrackets = bracketsConfig
        .map(function (brackets) {
            if (brackets[0] != brackets[1]) {
                return brackets[0];
            }
        })
        .filter((i) => i !== undefined);
    let closeBrackets = bracketsConfig
        .map(function (brackets) {
            if (brackets[0] != brackets[1]) {
                return brackets[1];
            }
        })
        .filter((i) => i !== undefined);
    let sameBrackets = bracketsConfig
        .map(function (brackets) {
            if (brackets[0] == brackets[1]) {
                return brackets[0];
            }
        })
        .filter((i) => i !== undefined);
    let stack = [];
    let arr = str.split("");
    for (let i = 0; i < arr.length; i++) {
        let lastBracketInStack = stack[stack.length - 1];
        if (
            sameBrackets.includes(arr[i]) &&
            stack.includes(arr[i]) &&
            openBrackets.includes(lastBracketInStack)
        ) {
            stack.push(arr[i]);
            continue;
        }
        if (sameBrackets.includes(arr[i]) && stack.includes(arr[i])) {
            stack.pop();
            continue;
        }
        if (openBrackets.includes(arr[i]) || sameBrackets.includes(arr[i])) {
            stack.push(arr[i]);
        }
        if (closeBrackets.includes(arr[i])) {
            if (stack.length == 0) {
                return false;
            }
            for (let j = 0; j < bracketsConfig.length; j++) {
                if (
                    lastBracketInStack == bracketsConfig[j][0] &&
                    arr[i] != bracketsConfig[j][1]
                ) {
                    return false;
                }
            }
            stack.pop();
        }
    }
    return stack.length == 0 ? true : false;
};
