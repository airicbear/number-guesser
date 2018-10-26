const NumberGuesser = {
  "answer": {
    number: Math.floor(Math.random() * 100) + 1,
    setMax: function (max = this.max()) {
      this.max = max;
      this.number = Math.floor(Math.random() * max) + 1;
    },
    max: 1000000,
  },

  "main": function (
    target = document.body, 
    max = this.answer.max, 
    winningMessage = "You won!", 
    winningClassName = "winningNumber", 
    answer = this.answer.number
  ) {
    let container = NumberGuesser.createContainer();
    let title = NumberGuesser.createTitle();
    let maxInput = NumberGuesser.createLabeledInput("Set max range", max);
    let form = NumberGuesser.createForm();
    let input = NumberGuesser.createMainInput();
    let submit = NumberGuesser.createSubmit();

    let setMax = function (max = max) {
      NumberGuesser.answer.setMax(max);
      answer = NumberGuesser.answer.number;
    }

    maxInput.onsubmit = function (event) {
      event.preventDefault();
      let userInput = maxInput.getElementsByTagName("input")[0].value;
      if (userInput !== "") {
        setMax(Number(userInput));
        input.placeholder = "Guess a number (1-" + userInput + ")";
        console.log("Set answer's max to: " + userInput);
      }
      return false;
    };

    form.onsubmit = function (event) {
      event.preventDefault();
      let userInput = Number(input.value);
      if (input.value !== "" && input.className !== winningClassName) {
        if (userInput === answer) {
          console.log(winningMessage);
          input.readOnly = true;
          input.className = winningClassName;
          input.placeholder = winningMessage;
          submit.value = "You won!";
        } else {
          let tryAgain = function (tryAgainMessage) {
            console.log(tryAgainMessage);
            input.value = "";
            input.placeholder = tryAgainMessage;
          };
          if (userInput < answer) {
            tryAgain("Try a higher number.");
          } else if (userInput > answer) {
            tryAgain("Try a lower number.");
          } else {
            tryAgain("Try again.");
          }
        }
      } else if (input.className === winningClassName) {
        let restart = function () {
          console.log("Restarted the game.");
          input.readOnly = false;
          input.className = "";
          input.restart();
          setMax(NumberGuesser.answer.max);
          submit.value = "Guess";
        };
        restart();
      }
      return false;
    }

    target.appendChild(container);
    container.appendChild(title);
    container.appendChild(maxInput);
    container.appendChild(form);
    form.appendChild(input);
    form.appendChild(submit);
  },

  "createContainer": function (
    id = "NumberGuesser", 
    element = "div"
  ) {
    let container = document.createElement(element);
    container.id = id;
    return container;
  },

  "createTitle": function (
    titleMessage = "Number Guesser", 
    id = "NumberGuesserTitle", 
    element = "h1"
  ) {
    let title = document.createElement(element);
    title.id = id;
    title.innerHTML = titleMessage;
    return title;
  },

  "createForm": function (
    id = "NumberGuesserForm",
    element = "form"
  ) {
    let form = document.createElement(element);
    form.id = id;
    return form;
  },

  "createMainInput": function (
    promptMessage = "Guess a number (1-" + this.answer.max + ")", 
    id = "NumberGuesserInput", 
    type = "number", 
    max = this.answer.max, 
    element = "input"
  ) {
    let defaultMessage = (max) => "Guess a number (1-" + max + ")";
    let input = document.createElement(element);
    input.max = max;
    input.type = type;
    input.id = id;
    input.placeholder = promptMessage;
    input.restart = function (placeholder = defaultMessage(max)) {
      this.placeholder = placeholder;
      this.value = "";
    };
    input.updatePlaceholder = function (max = max) {
      this.placeholder = defaultMessage(max);
    }
    return input;
  },

  "createSubmit": function (
    value = "Guess", 
    id = "NumberGuesserSubmit", 
    type = "submit", 
    element = "input"
  ) {
    let submit = document.createElement(element);
    submit.type = type;
    submit.id = id;
    submit.value = value;
    return submit;
  },

  "createLabeledInput": function (
    labelMessage = "Label", 
    value = 0,
    id = "NumberGuesserLabeledInput",
    className = "NumberGuesserLabeledInput", 
    type = "number"
  ) {
    let labeledInputContainer = document.createElement("form");
    labeledInputContainer.className = className;
    labeledInputContainer.id = id;

    let label = document.createElement("p");
    label.textContent = labelMessage;

    let input = document.createElement("input");
    input.type = type;
    input.value = value;

    labeledInputContainer.appendChild(label);
    labeledInputContainer.appendChild(input);
    return labeledInputContainer;
  },
}