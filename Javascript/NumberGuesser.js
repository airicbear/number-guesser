const NumberGuesser = {
  "answer": {
    number: Math.floor(Math.random() * 10) + 1,
  },

  "main": function (target = document.body, winningMessage = "You won!", tryAgainMessage = "Try again.", winningClassName = "winningNumber", answer = this.answer.number) {
    let container = NumberGuesser.createContainer();
    let title = NumberGuesser.createTitle();
    let form = NumberGuesser.createForm();
    let input = NumberGuesser.createInput();
    let submit = NumberGuesser.createSubmit();

    form.onsubmit = function (event) {
      event.preventDefault();
      if (input.value !== "" && input.className !== winningClassName) {
        if (Number(input.value) === answer) {
          console.log(winningMessage);
          input.readOnly = true;
          input.className = winningClassName;
          input.placeholder = winningMessage;
        } else {
          console.log(tryAgainMessage);
          input.value = "";
          input.placeholder = tryAgainMessage;
        }
      }
      return false;
    }

    target.appendChild(container);
    container.appendChild(title);
    container.appendChild(form);
    form.appendChild(input);
    form.appendChild(submit);
  },

  "createContainer": function (id = "NumberGuesser", element = "div") {
    let container = document.createElement(element);
    container.id = id;
    return container;
  },

  "createTitle": function (titleMessage = "Number Guesser", id = "NumberGuesserTitle", element = "h1") {
    let title = document.createElement(element);
    title.id = id;
    title.innerHTML = titleMessage;
    return title;
  },

  "createForm": function (element = "form", id = "NumberGuesserForm") {
    let form = document.createElement(element);
    form.id = id;
    return form;
  },

  "createInput": function (promptMessage = "Guess a number (1-10)", id = "NumberGuesserInput", type = "number", max = 10, min = 0, element = "input") {
    let input = document.createElement(element);
    input.min = min;
    input.max = max;
    input.type = type;
    input.id = id;
    input.placeholder = promptMessage;
    return input;
  },

  "createSubmit": function (value = "Guess", id = "NumberGuesserSubmit", type = "submit", element = "input") {
    let submit = document.createElement(element);
    submit.type = type;
    submit.id = id;
    submit.value = value;
    return submit;
  },
}