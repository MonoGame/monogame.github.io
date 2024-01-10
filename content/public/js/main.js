function seedRandom(seed) {
    let m = 0x80000000,
        a = 1103515245,
        c = 12345;
    seed = seed & (m - 1);
    return function () {
        seed = (a * seed + c) % m;
        return seed / (m - 1);
    };
}

function getHourSeed() {
    const d = new Date();
    return d.getFullYear() + d.getMonth() + d.getDate() + d.getHours();
}

function shuffle(items) {
    const seed = getHourSeed();
    const random = seedRandom(seed);
    let currentIndex = items.length;
    let temp, randomIndex;

    while(currentIndex != 0) {
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;

        temp = items[currentIndex];
        items[currentIndex] = items[randomIndex];
        items[randomIndex] = temp;
    }
}
