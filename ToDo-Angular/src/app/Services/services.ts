import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Services {
  constructor() {}

  //Parametros de GetTask() e TempURL()
  submitTask(task: string, imageSrc: string){
      // Criar nova LI, Checkbox, Label e Image
      const newLi = document.createElement("li");
      const newCheck = document.createElement("input"!)
      const newLabel = document.createElement("label")
      const newImg = document.createElement("img")

      // Muda o tipo do input para Checkbox
      newCheck.type = "checkbox"

      // Append Checkbox, Label e Image a LI e Coloca a Task na Label
      newLi.appendChild(newCheck)
      newLi.appendChild(newLabel)
      newLi.appendChild(newImg)
      newLi.className = "flex items-center space-x-2"
      newCheck.className = "accent-blue-600 w-4 h-4"
      newLabel.className = "label-Task text-sm"
      newImg.className = "max-w-[200px] rounded-[12px] border border-gray-300"
      newLabel.textContent = task;

      //Adiciona Imagem a List Completed puxa do TempURL()
      newImg.src = imageSrc

   
      // Buscar a lista de Task List
      const taskList = document.getElementById("task-List");

      // Adiciona ao UL a LI com appended à completed Task
      taskList?.appendChild(newLi);

      /* Chama funcao to save 
          this.saveTasks()
      */

  }
  completeTask(){

    // Gets Lists (UL) from HTML
    const list = document.getElementById('task-List');

    // If list has value (tasks) execute
    if (list) {
      
      // Puxa todas as Tasks para a variavel
      const allTasks = list.querySelectorAll('li');

      // Roda as tasks
      allTasks.forEach(li => {

        //Procura a primeira Checkbox na Li e coloca na var check
        const check = li.querySelector('input[type="checkbox"]') as HTMLInputElement

        // If a checkbox estiver checkada
        if (check.checked){

          // Buscar o valor da Label aka Task
          const rawElement = li.querySelector('label');
          //From element get textContent
          const text = rawElement?.textContent;

          // Buscar a lista de Task completas
          const taskCompleted = document.getElementById("task-completed");
         
          if (text){
            // Criar nova LI, Label, e Image
            const newLi = document.createElement("li");
            const newLabel = document.createElement("label")
            const newImg = document.createElement("img")
              newLi.className = "flex items-center space-x-2"
              newLabel.className = "label-Task text-sm"
              newImg.className = "max-w-[200px] rounded-[12px] border border-gray-300"

            // Append text a Label
            newLabel.textContent = text;

            //Append Label and Image a LI
            newLi.appendChild(newLabel)
            newLi.appendChild(newImg)

            // Adiciona ao UL a LI com appended à completed Task
            taskCompleted?.appendChild(newLi);
            li.remove()

          }
        }
      })
    }
  }
  removeTask(){

    // Gets Lists (UL) from HTML
    const list = document.getElementById('task-List');

    // If list has value (tasks) execute
    if (list) {
      
      // Puxa todas as Tasks para a variavel
      const allTasks = list.querySelectorAll('li');

      // Roda as tasks
      allTasks.forEach(li => {

        // Looks for input do tipo Checkbox 
        const check = li.querySelector('input[type="checkbox"]') as HTMLInputElement
        if (check.checked){
          li.remove()
        }
      });
    }
  }
  countTask(){
    // Gets Lists (list) from HTML
    const list = document.getElementById('task-List');

    // If list has value (tasks) execute
    if (list) {
      
      // Puxa todas as Tasks para a variavel
      const allTasks = list.querySelectorAll('li');

      var flag = 0;
      // Roda as tasks
      allTasks.forEach(li => {
        flag ++
      });
      
      //Alerta user de Quantidade de tasks
      alert("You currently have " + flag + " pending Tasks.");
    }
  }
  
}
