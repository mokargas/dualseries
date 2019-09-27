import React, { Fragment, PureComponent } from 'react';
import Select, { components } from 'react-select';
import styled from 'react-emotion';
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleUp, faAngleDown);

//NOTE: React-select uses Styles API. Per component `state` is also available
const customStyles = {
  control: (base, state) => {
    const { isFocused, selectProps } = state;
    const { isError, selectedOptions } = selectProps;

    return {
      ...base,
      backgroundColor: '#fff',
      minHeight: '51px;',
      border: '1px solid #e6f2f7',
      borderRadius: '30px',
      padding: '0 16px 0 26px',
      ':hover': {
        borderColor: '#037fac'
      }
    };
  },

  menu: base => { 
    return {
      ...base,
    };
  },

  menuPortal: base => {
    const { zIndex, ...rest } = base;
    return { ...rest, zIndex: 9999 };
  },

  multiValue: (base, state) => {
    const { selectProps } = state;
    const { selectedOptions } = selectProps;

    return {
      ...base,
    };
  },

  input: base => {
    return {
      ...base,
      color: 'inherit',
    };
  },

  multiValueLabel: base => {
    return {
      ...base,
    };
  },

  multiValueRemove: base => {
    return {
      ...base,
    };
  },

  option: (base, state) => {
    const { isSelected } = state;
    return {
      ...base,
    };
  },

  singleValue: (base, state) => {
    const { selectProps } = state;
    const { selectedOptions } = selectProps;

    return {
      ...base,
      fontSize: '0.8888rem',
      color: '#104F71'
    };
  },
};


const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={props.selectProps.menuIsOpen ? "angle-up" : "angle-down"} color="#007eac" />
      </components.DropdownIndicator>
    )
  );
};

const Holder = styled.div`
  color: #104F71;
  font-size:  0.8888rem;
  font-weight: 700;
`

const Placeholder = props => {
  return (
    <Holder>
      {props.children}
    </Holder>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Label = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 0 0.25rem;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SummaryTitle = styled.span`
  box-sizing: border-box;
  color: ${props => (props.active ? '#fff' : '#2b303b')};
  display: ${props => (props.visible ? 'inline-block' : 'none')}
  font-weight: bold;
  margin-left: 2px;
  margin-right: 2px;
  max-width: calc(100% - 8px);
  padding: 2px;
  position: absolute;
  text-overflow: ellipsis;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
`;

const selectAllOption = {label: 'Select All', value: '*'}

class Filter extends PureComponent{
  
  state = {
    selectedOptions: [],
  };

  static defaultProps = {
    clear: false,
    hideLabel: false,
    isError: false,
    isMulti: true,
    isRequired: true,
    selectAll: true,
    isSearchable: true,
    focusPlaceholder: 'Type to filter ...',
    options: [
      { value: 'chocolate', label: 'Chocolate', default: true },
      { value: 'lemon', label: 'Lemon' },
      { value: 'lime', label: 'Lime' },
      { value: 'orange', label: 'Orange' },
      { value: 'raspberry', label: 'Raspberry' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ],
    styles: {},
    placeholder: 'Type to filter ...',
    title: 'Datasets',
  };

  componentDidMount() {
    const selectedOptions = this.getDefault();
    this.setState({
      selectedOptions,
    });
  }

  getDefault = () => {
    const { initialValue, options } = this.props;
    return initialValue || options.filter(o => o.default);
  };

  handleChange = selected => {
    const { onChange, options } = this.props;
    console.log(options)
    const actual = selected && selected.find(d=> d.value === "*")? options.filter(d=>d.value !== "*").map(a=>({...a, default: true})): selected 
    this.setState({ selectedOptions: actual});
    onChange && onChange(actual);
  };

  render() {
    const {
      clear,
      hideLabel,
      isError,
      isMulti,
      isRequired,
      isSearchable,
      options,
      placeholder,
      showIndicator,
      showSummary,
      title,
      styles,
      onMenuClose,
      selectAll,
      onMenuOpen,
    } = this.props;
    const { selectedOptions } = this.state;
    return (
      <Container>
        {!hideLabel && (
          <Label>
            {title}
            {isRequired && <span>*</span>}
          </Label>
        )}
        <Select
          blurInputOnSelect={true}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          isMulti={isMulti}
          isError={isError}
          isSearchable={isSearchable}
          showSummary={showSummary}
          selectedOptions={selectedOptions}
          menuPortalTarget={document.body}
          styles={{...customStyles, ...styles}}
          components={makeAnimated({
            IndicatorSeparator: () => null,
            DropdownIndicator
          })}
          placeholder={<Placeholder>{this.state.placeholder || placeholder}</Placeholder>}
          hideSelectedOptions={false}
          onChange={this.handleChange}
          options={selectAll? [...options, selectAllOption]: options}
          title={title}
          value={clear ? null : selectedOptions} />
      </Container>
    );
  }
}

export default Filter;
