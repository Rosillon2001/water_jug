# WaterJug-FE-DanielRosillon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Node Setup

This project was made using NodeJs (v^18.16.1), needed to run this project. You can download and run the executable from the [official website](https://nodejs.org/en/blog/release/v18.16.1) for your respective operating system or either use NVM(Node Version Manager).

## Installing NVM (In case you don't have it yet)

For installing NVM, download the [ZIP](https://github.com/coreybutler/nvm-windows), unzip and run the executable.

## Node Version Management

To install the needed Node verison using NVM use these commands in the console of your preference:

```
nvm install 18.16.1
```

If you've already installed the node version either ways, verify the node 18.16.1 version is in use, using:

```
nvm list
```

If other version is in use, run: 
```
nvm use 18.16.1
```

## Project Setup

Once the repository is cloned, navigate/locate into the root folder and install the project dependencies using this command:

```
npm install
```

## Open Project/Development Server

For deploying the project locally, you must run Angular dev server, use the following command to do so:
```
ng serve
```
Then, navigate to `http://localhost:4200/` with your preferred browser. Or use this command to open the app in your operating system default browser: 
```
ng serve -o
```

<br>

---

<br>

# Explanation
The basic validations are that any of the values are postive integers x>0, y>0 (validated by the inputs), z(target) can't be higher than x and y, and each jug (x and y) must be of different capacities.

## Algorithmic Approach
There is always solution if the GCD (great common divisor) of X and Y divides Z, meaning that `Z % GCD(X, Y) = 0` if this condition is true, the problem has solution, and can be represented like A*X + B*Y = Z, where A and B are integers that represent the movements. Hence, the solution can be found using X or Y as a pivot or initial jug to be filled, poured and emptied once its full, and repeating the process until one of the two values reaches the target. 

  The process can be summarized like this:
  1.- Fill the X litre jug and empty it into Y liter jug.
  2.- Whenever the X liter jug becomes empty fill it.
  3.- Whenever the Y liter jug becomes full empty it.
  4.- Repeat steps 1,2,3 till either Y liter jug or the X liter jug contains Z litres of water.

Both results are compared based in the quantity of movements, and the most efficient approach is returned and displayed.

## Test Cases
1.- x=5 y=3 z=2 <br>
  case1(x;y): (5;0), (2;3) ----> Solved in 2 movements. Best Solution, using x as pivot/first to fill.
  case2(x;y): (0;3), (3;0), (3;3), (5;1), (0;1), (1;0), (1;3), (4;0), (4;3), (5;2) ----> Solved in 10 movements. Worst solution, using y as pivot/first to fill.

2.- x=3 y=5 z=4 <br>
  case1(x;y): (3;0), (0;3), (3;3), (1;5), (1;0), (0;1), (3;1), (0;4) ---> Solved in 8 movements. Worst Solution.
  case2(x;y): (0;5), (3;2), (0;2), (2;0), (2;5), (3;4) ---> Solved in 6 movements. Best Solution.

3.- x=21 y=14 z=7 <br>
  case1(x;y): (21;0), (14;7) ---> Solved in 2 movements. Best Solution.
  case2(x;y): (0;14), (14;0), (14;14), (21;7) ---> Solved in 4 movements. Worst Solution.

4.- x=88 y=56 z=3 <br>
  Not solvable due to the GCD of 88 and 56 equals 8, remenbering the condition of the algorithm (Z % GCD(X, Y) = 0), and 3%8 = 3 which is different that 0, there is no possible solution. 3 % GCD(88, 56) != 0.
<br>

---

<br>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
