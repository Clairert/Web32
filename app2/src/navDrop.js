class PullCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
    };
  }


  componentDidMount() {
    //Check for local storage before making api call
    {
      localStorage.getItem('countryData') == null &&
      fetch('http://10.25.100.77/countries')
        .then(response => response.json())
        .then(result => {
          let hitList = result;
          console.log(result);
          this.setState({ countries: hitList })
            ;
          localStorage.setItem("countryData", JSON.stringify(result));
        }).then(<DropDown />)
    }

  }

  render() {
    return <div>
      {localStorage.getItem('countryData') != null &&
        <DropDown />
      }
    </div>
  }

}


//Make tables filled with data
class MakeTables extends React.Component {
  render() {
    let dataSets = Object.keys(this.props.country.data).length > 0
      && Object.entries(this.props.country.data).map(([key, value], i) => {
        return <DataTable tableToAdd={value} tableName={key} />
      }, this);
    return <div>{dataSets}</div>;
  }
}

//Table showing data
class DataTable extends React.Component {
  render() {
    return <div>
      {this.props.tableToAdd != undefined &&
        <div id={this.props.tableName}>
          <h2>{this.props.tableName}</h2>
          <table class="table-responsive">
            <tbody>
              <tr><td><h2>Year</h2></td><td><h2>Data</h2></td></tr>

              {Object.keys(this.props.tableToAdd).length > 0
                && Object.entries(this.props.tableToAdd).map(([key, value], i) => {
                  return (
                    <tr key={i}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  )
                }, this)}

            </tbody>
          </table>
        </div>
      }
    </div>
  }
}

//Present information about table shown
class PresentInformation extends React.Component {
  render() {

    return <div><h1>Country Name:</h1>{this.props.displayC.name}<br></br>
      <MakeButtons country={this.props.displayC.name} /><br></br>
      <MakeTables country={this.props.displayC} /></div>;
  }

}

//MakeButtons
class MakeButtons extends React.Component {
  onDeleteFunc({ target: optionSelected }) {
    console.log(optionSelected);
    var deleteString = 'http://10.25.100.77/delete/' + optionSelected.value;
    var ids = optionSelected;
    console.log(deleteString);
    fetch(deleteString, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: optionSelected
    })
      .then(res => res.text()) // OR res.json()
      .then(res => console.log(res)).then(<PullCountries />)

  }
//Api call to add country
  onAddFunc(optionSelected) {
    console.log(document.getElementById("newCID").value);
    var addString = 'http://10.25.100.77/newCountry/' + document.getElementById("newCID").value;
    var ids = optionSelected;
    console.log(addString);
    fetch(addString, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: document.getElementById("newCID").value
    })
      .then(res => res.text()) // OR res.json()
      .then(res => console.log(res)).then(<PullCountries />)
  }
  render() {
    return <div>
      <label>New Country:</label><input type="text" id="newCID"></input>
      {console.log(this.props.country)}
      <button onClick={this.onAddFunc} value={this.props.country}>Add new Country</button>

      <button onClick={this.onDeleteFunc} value={this.props.country}>Delete This country</button>
    </div>
  }
}

//Create dropdown
class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: <PresentInformation displayC="" />,
      colours: {}
    };
  }

//When dropdown button has been clicked
  onChangeFunc({ target: optionSelected }) {
    const name = this.name;
    const value = optionSelected.value;
    const label = optionSelected.label;
    console.log(optionSelected.value);
    var savedCountries = JSON.parse(localStorage.getItem('countryData'));
    var selectedCountry = savedCountries[optionSelected.value];
    const data = <PresentInformation displayC={selectedCountry} />
    ReactDOM.render(data, document.getElementById('data'));

  }

  render() {
    const { countries } = this.state;
    var savedCountries = JSON.parse(localStorage.getItem('countryData'));
    let countriesList = savedCountries.length > 0
      && savedCountries.map((item, i) => {
        return (

          <option key={item._id.$oid} value={i}>{item.name}</option>
        )
      }, this);

    return (
      <div>
        <select onChange={this.onChangeFunc} value={this.state.value}>
          {countriesList}
        </select>

      </div>
    );
  }
}







//load page
const element = <PullCountries />;
ReactDOM.render(
  element,
  document.getElementById('dropDown')
);