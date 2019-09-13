export const createElementFromString = (data: string): HTMLElement => {
    let container = document.createElement("div");
    container.innerHTML = data.trim();
    let result = (container.firstChild as HTMLElement);
    container.removeChild(result);
    return result;
};
