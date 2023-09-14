import kMeans from 'kmeansjs';

const defaultData = [
    [10, 2, 30],
    [30, 20, 2],
    [30, 30, 3],
    [10, 10, 1],
    [20, 1, 30],
    [1, 25, 30],
    [10, 15, 1],
    [20, 5, 10],
    [1, 1, 1],
    [2, 4, 5],
    [6, 10, 3],
    [1000, 51, 200]
];

console.log(defaultData)

const defaultPoints = 2;

function collectInputs() {
    const buttons = document.querySelectorAll('.button-go');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            let file = document.querySelector('.input-file').value;
            let kPoints = document.querySelector('.input-k-points').value;
            if (!file) {
                file = defaultData;
            }
            if (!kPoints) {
                kPoints = defaultPoints;
            }
            kMeans(file, kPoints, function(err, res) {
                if (err) throw new Error(err)
                console.log(res)
            })
        });
    });
}

collectInputs();







