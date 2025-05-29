const main = () => {
    console.log('hi');    
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', main);
}
