const main = () => {
    console.log('hi');    
}

if (typeof window !== 'undefined') {
    globalThis.addEventListener('DOMContentLoaded', main);
}
