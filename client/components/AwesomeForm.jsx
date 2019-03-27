import React, { Component, Fragment } from "react";

export default class AwesomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailIsValid: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    if (event.target.name == "email") {
      var isValid = this.emailValidation(event.target.value);
      isValid
        ? this.setState({ email: event.target.value, emailIsValid: false })
        : this.setState({ emailIsValid: true });
    }
  }

  emailValidation(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <Fragment>
        <form method="post" action="">
          <h1>Fill out this awesome form</h1>
          <fieldset>
            <h3>Your details</h3>
            <p className={!this.state.emailIsValid ? "" : "error"}>
              <label class="label" for="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={this.handleChange}
              />
            </p>
            {this.state.emailIsValid ? (
              <p className="error">Email is invalid</p>
            ) : (
              ""
            )}
            <p>
              <label class="label" for="password">
                Password
              </label>
              <input
                class="error"
                type="password"
                id="password"
                name="username"
              />
            </p>
          </fieldset>

          <fieldset>
            <h3>Your animal</h3>
            <p>
              <label class="label" for="colour">
                Colour
              </label>
              <select name="colour" id="colour">
                <option value="">Choose colour</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
              </select>
            </p>
            <p>
              <span class="label">Animal</span>

              <input type="checkbox" name="animal" value="bear" id="bear" />
              <label for="bear">Bear</label>

              <input type="checkbox" name="animal" value="tiger" id="tiger" />
              <label for="tiger">Tiger</label>

              <input type="checkbox" name="animal" value="snake" id="snake" />
              <label for="snake">Snake</label>

              <input type="checkbox" name="animal" value="donkey" id="donkey" />
              <label for="donkey">Donkey</label>
            </p>
            <p>
              <label class="label" for="tiger_type">
                Type of tiger
              </label>
              <input type="text" name="tiger_type" id="tiger_type" />
            </p>
          </fieldset>
          <fieldset>
            <p>
              <input type="submit" value="Create account" />
            </p>
          </fieldset>
        </form>
      </Fragment>
    );
  }
}
