export function setLocalStorage<T>(name: string, listData: Array<T>) {
    localStorage.setItem(name, JSON.stringify(listData));
}

export const getLocalStorage = (name: string) => {
    return JSON.parse(localStorage.getItem(name) as string);
};