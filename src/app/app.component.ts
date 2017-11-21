import { Component, OnInit } from '@angular/core';
import * as localForage from "localforage";
import { cloneDeep, pullAllBy } from 'lodash';

import { Hero } from './hero';

const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Component({
  selector: 'my-app',
//   template: `
//     <h1>{{title}}</h1>
//     <h2>My Heroes</h2>
//     <ul class="heroes">
//       <li *ngFor="let hero of heroes"
//         [class.selected]="hero === selectedEmployee"
//         (click)="onSelect(hero)">
//         <span class="badge">{{hero.id}}</span> {{hero.name}}
//       </li>
//     </ul>
//     <hero-detail [hero]="selectedEmployee"></hero-detail>
//   `,
//   styles: [`
//     .selected {
//       background-color: #CFD8DC !important;
//       color: white;
//     }
//     .heroes {
//       margin: 0 0 2em 0;
//       list-style-type: none;
//       padding: 0;
//       width: 15em;
//     }
//     .heroes li {
//       cursor: pointer;
//       position: relative;
//       left: 0;
//       background-color: #EEE;
//       margin: .5em;
//       padding: .3em 0;
//       height: 1.6em;
//       border-radius: 4px;
//     }
//     .heroes li.selected:hover {
//       background-color: #BBD8DC !important;
//       color: white;
//     }
//     .heroes li:hover {
//       color: #607D8B;
//       background-color: #DDD;
//       left: .1em;
//     }
//     .heroes .text {
//       position: relative;
//       top: -3px;
//     }
//     .heroes .badge {
//       display: inline-block;
//       font-size: small;
//       color: white;
//       padding: 0.8em 0.7em 0 0.7em;
//       background-color: #607D8B;
//       line-height: 1em;
//       position: relative;
//       left: -1px;
//       top: -4px;
//       height: 1.8em;
//       margin-right: .8em;
//       border-radius: 4px 0 0 4px;
//     }
//     .employeeList {
//     list-style: none;
//     padding: 0;
//         margin-top: 30px;
// }
// .employeeList li {
//         padding: 5px 5px;
// }
// .employeeList li p {
//     width: 49%;
//     display: inline-block;
//         margin: 0;
// }
// li.first {
//     background: #d8d8d8;
// }
// li.active:not(.first), li:hover:not(.first){
//   background: #E27575;
//     color: #ffffff;
//     text-shadow: 1px 1px 1px #9E3F3F; 
// }
// .basic-grey {
//     margin-left:auto;
//     margin-right:auto;
//     max-width: 500px;
//     background: #F7F7F7;
//     padding: 25px 15px 25px 10px;
//     font: 16px Georgia, "Times New Roman", Times, serif;
//     color: #888;
//     text-shadow: 1px 1px 1px #FFF;
//     border:1px solid #E4E4E4;
//         position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
// }
// .basic-grey h1 {
//     font-size: 25px;
//     padding: 0px 0px 10px 40px;
//     display: block;
//     border-bottom:1px solid #E4E4E4;
//     margin: -10px -15px 30px -10px;;
//     color: #888;
// }
// .basic-grey h1>span {
//     display: block;
//     font-size: 11px;
// }
// .basic-grey label {
//     display: block;
//     margin: 0px;
// }
// .basic-grey label>span {
//     float: left;
//     width: 10%;
//     text-align: left;
//     padding-right: 15px;
//     margin-top: 10px;
//     color: #888;
// }
// .basic-grey input[type="text"], .basic-grey input[type="email"], .basic-grey textarea, .basic-grey select {
//     border: 1px solid #DADADA;
//     color: #888;
//     height: 30px;
//     margin-bottom: 16px;
//     margin-right: 6px;
//     margin-top: 2px;
//     outline: 0 none;
//     padding: 3px 3px 3px 5px;
//     width: 81%;
//     font-size: 12px;
//     line-height:15px;
//     box-shadow: inset 0px 1px 4px #ECECEC;
//     -moz-box-shadow: inset 0px 1px 4px #ECECEC;
//     -webkit-box-shadow: inset 0px 1px 4px #ECECEC;
// }


// .basic-grey .button {
//     background: #E27575;
//     border: none;
//     padding: 10px 25px 10px 25px;
//     color: #FFF;
//     box-shadow: 1px 1px 5px #B6B6B6;
//     border-radius: 3px;
//     text-shadow: 1px 1px 1px #9E3F3F;
//     cursor: pointer;
// }
// .basic-grey .button:hover {
//     background: #CF7A7A
// }
// .basic-grey .button:disabled,
// button[disabled]{
//  background: #948e8e;
//  text-shadow: none;
// }
//   `],
  styles: [`
      nav {
        margin: 0 0 10px;
        display: block;
      }
      nav a {
        padding: 5px 10px;
        text-decoration: none;
        background: #000000;
        color: #ffffff;
        border-radius: 3px;
    }
  `],
  templateUrl: './app.component.html'
})
export class AppComponent {
  allEmployees: any = [];
  employees: any;
  title = 'Angular Demo Components';
  heroes = HEROES;
  selectedEmployee: Hero = new Hero();
  employeesData = [];

  ngOnInit() {
    this.employees = localForage.createInstance({
      name: "demo_Db",
      storeName: "employees"
    });
  }

  getEmployeesFromDb() {
    this.employees.getItem('employeesData', (err, employeesData) => {
      this.employeesData = cloneDeep(employeesData);
      this.allEmployees = cloneDeep(employeesData);
    });
  };

  onSelect(hero: Hero): void {
    this.selectedEmployee = hero;
  }

  onFormSubmit() {

    if (this.selectedEmployee.id) {
      this.updateEmployee(this.selectedEmployee.id);
    }
    else {
      let id = new Date().getTime();
      this.employeesData.push({
        id: id,
        name: this.selectedEmployee.name
      })
      this.addEmployee();
    }

  }

  onEmployeeRowClick(employee) {
    this.selectedEmployee = cloneDeep(employee);
  }

  resetForm() {
    this.selectedEmployee = {};
  }

  addEmployee() {
    this.employees.setItem('employeesData', this.employeesData, (err, employeesData) => {
      if (!err) {
        alert("success");
      }
    });
  }

  onEmployeeDelete() {
    console.log("this.employeesData before delete", this.employeesData);
    pullAllBy(this.employeesData, [{ 'id': this.selectedEmployee.id }], 'id');
    console.log("this.employeesData", this.employeesData);
    this.addEmployee();
    this.resetForm();
  }

  updateEmployee(employeeID) {
    this.employees.getItem('employeesData', (err, employeesData) => {
      employeesData.forEach((element, index) => {
        if (element.id === employeeID) {
          element.name = this.selectedEmployee.name;
        }
      });
      this.employeesData = cloneDeep(employeesData);
      this.addEmployee();
    });
  }
}