let array = [];
let step = 1;
let displayedSteps = {};

// Get the input field and array container
const inputField = document.getElementById('array-input');
const arrayContainer = document.getElementById('array-container');

// Parse the input array
function parseInputArray() {
  const inputValue = inputField.value;
  array = inputValue.split(',').map(Number);
  return array;
}

// Display array as a train format
function displayArray(arr) {
  const stepKey = arr.join(',');
  if (!displayedSteps[stepKey]) {
    const stepElement = document.createElement('div');
    stepElement.classList.add('step');
    stepElement.textContent = `Step ${step}:`;
    arrayContainer.appendChild(stepElement);
    
    const train = document.createElement('div');
    train.classList.add('train');
    arr.forEach(value => {
      const car = document.createElement('div');
      car.classList.add('car');
      car.textContent = value;
      train.appendChild(car);
    });
    arrayContainer.appendChild(train);
    
    displayedSteps[stepKey] = true;
    step++; // Increment the step counter
  }
}

// Quick sort logic
async function quickSort(arr, low, high) {
  if (low < high) {
    displayArray(arr.slice()); // Display the array before partitioning
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

// Partition logic for quick sort
async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  displayArray(arr.slice()); // Update display after final swap
  await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
  return i + 1;
}

// Start the quick sort visualization
async function quickSortVisualization() {
  array = parseInputArray(); // Parse the input array
  displayArray(array.slice()); // Display the initial array
  await quickSort(array, 0, array.length - 1);
}

// Add event listener to the button
document.getElementById('sort-button').addEventListener('click', quickSortVisualization);