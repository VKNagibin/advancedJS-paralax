const fileInput = document.querySelector('.file-input');
const firstSquare = document.querySelector('#firstSquare');
const secondSquare = document.querySelector('#secondSquare');
const squaresBlock = document.querySelector('.squaresBlock');

const MAXIMUM_SCROLL_VALUE = squaresBlock.scrollHeight - squaresBlock.offsetHeight;

const img = prepareImage();

const connection = {
    firstSquareRadio: "firstSquare",
    secondSquareRadio: "secondSquare",
};

fileInput.addEventListener('input', (e) => {
    const radios = document.querySelectorAll('input[type="radio"]');
    const chosenRadio = Array.from(radios).find(radio => radio.checked === true);
    const fReader = new FileReader();
    fReader.readAsDataURL(e.target.files[0]);

    fReader.onloadend = (e) => {
        img.src = e.target.result;
        document
            .getElementById(connection[chosenRadio.id])
            .appendChild(img);
    }
    e.target.value = '';
});

const visiblePageAreaPercentage = MAXIMUM_SCROLL_VALUE / squaresBlock.offsetHeight;

squaresBlock.addEventListener('scroll', () => {
    const scrollPercentage = (squaresBlock.scrollTop * 100) / MAXIMUM_SCROLL_VALUE;
    const secondSquareBoost = MAXIMUM_SCROLL_VALUE / squaresBlock.scrollTop;
    firstSquare.style.top =
        `${squaresBlock.scrollTop / visiblePageAreaPercentage - scrollPercentage}px`;

    secondSquare.style.top = `
        ${(squaresBlock.scrollTop /
        secondSquareBoost /
        visiblePageAreaPercentage ) -
        (scrollPercentage / secondSquareBoost)}px`;
});

function prepareImage() {
    const img = document.createElement("img");
    img.style.position = "absolute";
    img.style.inset = "0";
    img.style.width = "inherit";
    img.style.objectPosition = "center";
    img.style.objectFit = "cover";
    img.style.height = "inherit";

    return img;
}
