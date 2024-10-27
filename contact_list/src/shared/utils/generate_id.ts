export const generateId = () => {
    const timestamp = Date.now().toString(16);
    const randomPart = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        const random = (Math.random() * 16) | 0;
        const value = char === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });

    return `${timestamp}-${randomPart}`;
}