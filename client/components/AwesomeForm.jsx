import React, { Component, Fragment } from "react";

export default class AwesomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      password: "",
      passwordError: false,
      colour: "",
      animals: [],
      animalError: false,
      tiger: false,
      submit: false,
      newAcc: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //onsubmit checkboxes

  handleChange() {
    switch (event.target.name) {
      case "email":
        var isValid = this.emailValidation(event.target.value);
        isValid
          ? this.setState({ email: event.target.value, emailError: false })
          : this.setState({ emailError: true });
        break;
      case "password":
        var password = event.target.value;
        var isValid = password.length > 8;

        isValid
          ? this.setState({ password, passwordError: false })
          : this.setState({ passwordError: true });
        break;
      case "colour":
        this.setState({ colour: event.target.value });
      case "animal":
        this.animalsValidation();
        if (event.target.checked) {
          this.setState(
            state => {
              var animals = [...state.animals, event.target.value];
              return { animals };
            },
            () => this.animalsValidation()
          );
        } else if (!event.target.checked) {
          var updatedArr = this.state.animals.filter(
            animal => animal != event.target.value
          );
          this.setState({ animals: updatedArr }, () =>
            this.animalsValidation()
          );
        }
    }
  }

  onSubmit(event) {
    console.log("hit");
    event.prevetDefault();
    var newAcc = {
      email: this.state.email,
      colour: this.state.colour,
      animals: this.state.animals
    };

    this.setState({ submit: true, newAcc });
  }

  emailValidation(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  animalsValidation() {
    if (this.state.animals.length < 2) {
      this.setState({ animalError: true });
      this.containsTiger();
    } else {
      this.setState({ animalError: false });
      this.containsTiger();
    }
  }

  containsTiger() {
    var arrContainsTiger = this.state.animals.indexOf("tiger") > -1;
    if (arrContainsTiger) {
      this.setState({ tiger: true });
    } else {
      this.setState({ tiger: false });
    }
  }

  render() {
    return (
      <Fragment>
        {!this.state.submit ? (
          <form onSubmit={this.onSubmit}>
            <h1>Fill out this awesome form</h1>
            <fieldset>
              <h3>Your details</h3>
              <p className={!this.state.emailError ? "" : "error"}>
                <label className="label" for="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                  required
                />
              </p>
              {this.state.emailError ? (
                <p className="error">Email is invalid</p>
              ) : (
                ""
              )}

              <p className={!this.state.passwordError ? "" : "error"}>
                <label className="label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={this.handleChange}
                  required
                />
              </p>
              {this.state.passwordError ? (
                <p className="error">
                  Password must be longer than 8 characters
                </p>
              ) : (
                ""
              )}
            </fieldset>

            <fieldset>
              <h3>Your animal</h3>
              <p>
                <label className="label" for="colour">
                  Colour
                </label>
                <select required name="colour" id="colour">
                  <option value="">Choose colour</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="black">Black</option>
                  <option value="brown">Brown</option>
                </select>
              </p>

              <p className={!this.state.animalError ? "" : "error"}>
                <label for="animal" className="label">
                  Animal
                </label>

                <input
                  type="checkbox"
                  name="animal"
                  value="bear"
                  id="bear"
                  onChange={this.handleChange}
                />
                <label for="bear">Bear</label>

                <input
                  type="checkbox"
                  name="animal"
                  value="tiger"
                  id="tiger"
                  onChange={this.handleChange}
                />
                <label for="tiger">Tiger</label>

                <input
                  type="checkbox"
                  name="animal"
                  value="snake"
                  id="snake"
                  onChange={this.handleChange}
                />
                <label for="snake">Snake</label>

                <input
                  type="checkbox"
                  name="animal"
                  value="donkey"
                  id="donkey"
                  onChange={this.handleChange}
                />
                <label for="donkey">Donkey</label>
              </p>
              {this.state.animalError ? (
                <p className="error">At least two animals must be chosen</p>
              ) : (
                ""
              )}

              {this.state.tiger ? (
                <p>
                  <label className="label" for="tiger_type">
                    Type of tiger
                  </label>
                  <input
                    type="text"
                    name="tiger_type"
                    id="tiger_type"
                    required
                  />
                </p>
              ) : (
                ""
              )}
            </fieldset>
            <fieldset>
              <p>
                <button type="submit"> Create Account </button>
              </p>
            </fieldset>
          </form>
        ) : (
          <Fragment>
            <h3>Email: {this.state.newAcc.email}</h3>
            <h3>
              Colour:{" "}
              <div
                className="pixel"
                style={"color:" + this.state.newAcc.colour}
              />
            </h3>
            <h3>Animals: </h3>
            <ul>
              {this.state.newAcc.animals.map(animal => {
                return <li>{animal}</li>;
              })}
            </ul>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
