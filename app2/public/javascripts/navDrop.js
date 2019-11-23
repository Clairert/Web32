var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PullCountries = function (_React$Component) {
  _inherits(PullCountries, _React$Component);

  function PullCountries(props) {
    _classCallCheck(this, PullCountries);

    var _this = _possibleConstructorReturn(this, (PullCountries.__proto__ || Object.getPrototypeOf(PullCountries)).call(this, props));

    _this.state = {
      hits: []
    };
    return _this;
  }

  _createClass(PullCountries, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      //Check for local storage before making api call
      {
        !localStorage.getItem('countryData');
        fetch('http://10.25.100.77/countries').then(function (response) {
          return response.json();
        }).then(function (result) {
          console.log("Resent");
          var hitList = result;
          console.log(result);
          _this2.setState({ countries: hitList });
          localStorage.setItem("countryData", JSON.stringify(result));
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(DropDown, null)
      );
    }
  }]);

  return PullCountries;
}(React.Component);

var MakeTables = function (_React$Component2) {
  _inherits(MakeTables, _React$Component2);

  function MakeTables() {
    _classCallCheck(this, MakeTables);

    return _possibleConstructorReturn(this, (MakeTables.__proto__ || Object.getPrototypeOf(MakeTables)).apply(this, arguments));
  }

  _createClass(MakeTables, [{
    key: 'render',
    value: function render() {
      var dataSets = Object.keys(this.props.country.data).length > 0 && Object.entries(this.props.country.data).map(function (_ref, i) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return React.createElement(DataTable, { tableToAdd: value, tableName: key });
      }, this);
      return React.createElement(
        'div',
        null,
        dataSets
      );
    }
  }]);

  return MakeTables;
}(React.Component);

var DataTable = function (_React$Component3) {
  _inherits(DataTable, _React$Component3);

  function DataTable() {
    _classCallCheck(this, DataTable);

    return _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).apply(this, arguments));
  }

  _createClass(DataTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.props.tableToAdd != undefined && React.createElement(
          'div',
          { id: this.props.tableName },
          React.createElement(
            'h2',
            null,
            this.props.tableName
          ),
          React.createElement(
            'table',
            null,
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'h2',
                    null,
                    'Year'
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'h2',
                    null,
                    'Data'
                  )
                )
              ),
              Object.keys(this.props.tableToAdd).length > 0 && Object.entries(this.props.tableToAdd).map(function (_ref3, i) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    key = _ref4[0],
                    value = _ref4[1];

                return React.createElement(
                  'tr',
                  { key: i },
                  React.createElement(
                    'td',
                    null,
                    key
                  ),
                  React.createElement(
                    'td',
                    null,
                    value
                  )
                );
              }, this)
            )
          )
        )
      );
    }
  }]);

  return DataTable;
}(React.Component);

var PresentInformation = function (_React$Component4) {
  _inherits(PresentInformation, _React$Component4);

  function PresentInformation() {
    _classCallCheck(this, PresentInformation);

    return _possibleConstructorReturn(this, (PresentInformation.__proto__ || Object.getPrototypeOf(PresentInformation)).apply(this, arguments));
  }

  _createClass(PresentInformation, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Country Name:'
        ),
        this.props.displayC.name,
        React.createElement('br', null),
        React.createElement(MakeButtons, { country: this.props.displayC.name }),
        React.createElement('br', null),
        React.createElement(MakeTables, { country: this.props.displayC })
      );
    }
  }]);

  return PresentInformation;
}(React.Component);

var MakeButtons = function (_React$Component5) {
  _inherits(MakeButtons, _React$Component5);

  function MakeButtons() {
    _classCallCheck(this, MakeButtons);

    return _possibleConstructorReturn(this, (MakeButtons.__proto__ || Object.getPrototypeOf(MakeButtons)).apply(this, arguments));
  }

  _createClass(MakeButtons, [{
    key: 'onDeleteFunc',
    value: function onDeleteFunc(_ref5) {
      var optionSelected = _ref5.target;

      console.log(optionSelected);
      var deleteString = 'http://10.25.100.77/delete/' + optionSelected.value;
      var ids = optionSelected;
      console.log(deleteString);
      fetch(deleteString, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: optionSelected
      }).then(function (res) {
        return res.text();
      }) // OR res.json()
      .then(function (res) {
        return console.log(res);
      }).then(localStorage.clear()).then(React.createElement(PullCountries, null));
    }
  }, {
    key: 'onAddFunc',
    value: function onAddFunc(optionSelected) {
      console.log(document.getElementById("newCID").value);
      var addString = 'http://10.25.100.77/newCountry/' + document.getElementById("newCID").value;
      var ids = optionSelected;
      console.log(addString);
      fetch(addString, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: document.getElementById("newCID").value
      }).then(function (res) {
        return res.text();
      }) // OR res.json()
      .then(function (res) {
        return console.log(res);
      }).then(localStorage.clear()).then(React.createElement(PullCountries, null));
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          null,
          'New Country:'
        ),
        React.createElement('input', { type: 'text', id: 'newCID' }),
        console.log(this.props.country),
        React.createElement(
          'button',
          { onClick: this.onAddFunc, value: this.props.country },
          'Add new Country'
        ),
        React.createElement(
          'button',
          { onClick: this.onDeleteFunc, value: this.props.country },
          'Delete This country'
        )
      );
    }
  }]);

  return MakeButtons;
}(React.Component);

var DropDown = function (_React$Component6) {
  _inherits(DropDown, _React$Component6);

  function DropDown(props) {
    _classCallCheck(this, DropDown);

    var _this7 = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

    _this7.state = {
      countries: React.createElement(PresentInformation, { displayC: '' }),
      colours: {}
    };
    return _this7;
  }

  _createClass(DropDown, [{
    key: 'onChangeFunc',
    value: function onChangeFunc(_ref6) {
      var optionSelected = _ref6.target;

      var name = this.name;
      var value = optionSelected.value;
      var label = optionSelected.label;
      console.log(optionSelected.value);
      var savedCountries = JSON.parse(localStorage.getItem('countryData'));
      var selectedCountry = savedCountries[optionSelected.value];
      var data = React.createElement(PresentInformation, { displayC: selectedCountry });
      ReactDOM.render(data, document.getElementById('data'));
    }
  }, {
    key: 'render',
    value: function render() {
      var countries = this.state.countries;

      var savedCountries = JSON.parse(localStorage.getItem('countryData'));
      var countriesList = savedCountries.length > 0 && savedCountries.map(function (item, i) {
        return React.createElement(
          'option',
          { key: item._id.$oid, value: i },
          item.name
        );
      }, this);

      return React.createElement(
        'div',
        null,
        React.createElement(
          'select',
          { onChange: this.onChangeFunc, value: this.state.value },
          countriesList
        )
      );
    }
  }]);

  return DropDown;
}(React.Component);

var element = React.createElement(PullCountries, null);
ReactDOM.render(element, document.getElementById('dropDown'));