import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// Forms
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
// Interface
import { movements } from '../../interfaces/movement.interface';

@Component({
  selector: 'app-water-jugs',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './water-jugs.component.html',
  styleUrl: './water-jugs.component.scss'
})

export class WaterJugsComponent implements OnInit{

  // Form
  form: FormGroup = new FormGroup({
    jugX: new FormControl(1, [Validators.required]),
    jugY: new FormControl(1, [Validators.required]),
    targetZ: new FormControl(1, [Validators.required])
  });
  // Helper Variables
  is_solvable: boolean = false;
  // Movements explanation
  movementsX: movements[] = [];
  movementsY: movements[] = [];
  // Display solution
  display_best: string = '';
  // Jugs values
  actual_jugX: number = 0;
  actual_jugY: number = 0;
  // Snackbar
  @ViewChild('snackbar') snackbar: ElementRef = new ElementRef(null);
  snack_message: string = 'Please fill all the fields';

  constructor() { }

  ngOnInit(): void {
  }

  // Calculate button function that calls the verifySolution function
  calculate(): void {
    const jugX = this.form?.get('jugX')?.value;
    const jugY = this.form?.get('jugY')?.value;
    const targetZ = this.form?.get('targetZ')?.value;
    this.verifySolution(jugX, jugY, targetZ);
  }

  // Verify if Solution is possible
  verifySolution(jugX:number, jugY: number, targetZ: number): void {
    // Verify if the solution is possible
    if(targetZ > jugX && targetZ > jugY) {
      this.is_solvable = false;
      this.snack_message = 'Target value is bigger than jugs capacity';
      this.showSnackbar('error');
      return;
    }
    if(jugX === jugY) {
      this.is_solvable = false;
      this.snack_message = 'Jugs capacity cannot be equal';
      this.showSnackbar('error');
      return;
    }
    else {
      // If the target value is divisible by the GCD of the jugs capacity, the solution is possible
      // Because the GCD is the maximum amount of water that can be poured from one jug to the other
      if (targetZ % this.gcd(jugX, jugY) === 0) {
        this.is_solvable = true;
      }else {
        this.is_solvable = false;
        this.snack_message = 'Not solvable';
        this.showSnackbar();
        return;
      }
    }
    // Solve if the solution is possible
    if(this.is_solvable) {
      let solved_by_x = this.solveX(jugX, jugY, targetZ, this.is_solvable);
      let solved_by_y = this.solveY(jugX, jugY, targetZ, this.is_solvable);
      if(solved_by_x < solved_by_y) {
        this.display_best = 'X';
        this.snack_message = 'Solved!';
        this.showSnackbar('success');
      }else {
        this.display_best = 'Y';
        this.snack_message = 'Solved!';
        this.showSnackbar('success');
      }
    }
  }

  // ------------------------------------------- Solving Methods --------------------------------------------- //
  solveX(jugX: number, jugY: number, target: number, is_solvable: boolean): number {
    // Initialize variables
    this.movementsX = [];
    this.actual_jugX = 0; this.actual_jugY = 0;
      // While one of the jugs is not equal to the target
        while(this.actual_jugX !== target && this.actual_jugY !== target) {
          if(this.actual_jugX === 0) {
            this.fillJug('jugX', jugX);
            this.movementsX.push({x_value: this.actual_jugX, y_value: this.actual_jugY, movement: 'Fill jug X'});
            if(this.verifyCompletion(target)) break;
          }
          if(this.actual_jugY < jugY) {
            let jugY_capacity = jugY - this.actual_jugY;
            let amount_to_pour = Math.min(this.actual_jugX, jugY_capacity);
            this.pourJug('jugX', amount_to_pour);
            this.movementsX.push({x_value: this.actual_jugX, y_value: this.actual_jugY, movement: 'Pour jug X into jug Y'});
            if(this.verifyCompletion(target)) break;
          }
          if(this.actual_jugY === jugY) {
            this.emptyJug('jugY');
            this.movementsX.push({x_value: this.actual_jugX, y_value: this.actual_jugY, movement: 'Empty jug Y'});
            if(this.verifyCompletion(target)) break;
          }
    }
    this.movementsX[this.movementsX.length-1].movement += '. Solved';
    return this.movementsX.length;
  }

  solveY(jugX: number, jugY: number, target: number, is_solvable: boolean): number {
    // Initialize variables
    this.movementsY = [];
    this.actual_jugX = 0; this.actual_jugY = 0;
      // While one of the jugs is not equal to the target
      while(this.actual_jugY !== target && this.actual_jugX !== target) {
        if(this.actual_jugY === 0) {
          this.fillJug('jugY', jugY);
          this.movementsY.push({x_value: this.actual_jugX, y_value: this.actual_jugY, movement: 'Fill jug Y'});
          if(this.verifyCompletion(target)) break;
        }
        if(this.actual_jugX < jugX) {
          let jugX_capacity = jugX - this.actual_jugX;
          let amount_to_pour = Math.min(this.actual_jugY, jugX_capacity);
          this.pourJug('jugY', amount_to_pour);
          this.movementsY.push({x_value: this.actual_jugX, y_value: this.actual_jugY, movement: 'Pour jug Y into jug X'});
          if(this.verifyCompletion(target)) break;
        }
        if(this.actual_jugX === jugX) {
          this.emptyJug('jugX');
          this.movementsY.push({x_value: this.actual_jugX, y_value: this.actual_jugY, movement: 'Empty jug X'});
          if(this.verifyCompletion(target)) break;
        }
      }
      this.movementsY[this.movementsY.length-1].movement += '. Solved';
      return this.movementsY.length;
  }

  // ------------------------------------------- Movement Methods --------------------------------------------- //
  // Fill Jug
  fillJug(jug: string, quantity: number): void {
    switch(jug) {
      case 'jugX':
        this.actual_jugX += quantity;
        break;
      case 'jugY':
        this.actual_jugY += quantity;
        break;
    }
  }

  // Empty Jug
  emptyJug(jug: string): void {
    switch(jug) {
      case 'jugX':
        this.actual_jugX = 0;
        break;
      case 'jugY':
        this.actual_jugY = 0;
        break;
    }
  }

  // Pour Jug
  pourJug(jug: string, quantity: number): void {
    switch(jug) {
      case 'jugX':
        this.actual_jugX -= quantity;
        this.actual_jugY += quantity;
        break;
      case 'jugY':
        this.actual_jugY -= quantity;
        this.actual_jugX += quantity;
        break;
    }
  }

  // ------------------------------------------- Helper Methods --------------------------------------------- //
  // Greatest Common Divisor GCD function
  gcd(a: number, b: number): number {
    // If one of the numbers is 0, the other number is the GCD
    if (b === 0) return a;

    // Otherwise, recursively compute the GCD
    return this.gcd(b, a % b);
  }

  // Verify Completion Method used to verify if the solution is completed after each movement
  verifyCompletion(targetZ: number): boolean {
    let completion = false;
    // If one of the jugs is equal to the target, the solution is completed
    if(this.actual_jugX === targetZ || this.actual_jugY === targetZ) {
      completion = true;
    }
    return completion;
  }

  // ------------------------------------------- Form Methods --------------------------------------------- //
  // Form Validator
  validateForm(): boolean {
    this.snack_message = 'Please fill all the fields';
    if(!this.form.valid) this.showSnackbar();
    return this.form.valid;
  }

  // ------------------------------------------- Snackbar Methods --------------------------------------------- //
  // show snackbar
  showSnackbar(custom_class?: string): void {
    this.snackbar.nativeElement.classList.add('show');
    if(custom_class) {
      this.snackbar.nativeElement.classList.add(custom_class);
    }
    this.snackbar.nativeElement.innerText = this.snack_message;
    setTimeout(() => {
      this.snackbar?.nativeElement.classList.remove('show');
      if(custom_class) {
        this.snackbar.nativeElement.classList.remove(custom_class);
      }
    }, 1500);
  }

}
