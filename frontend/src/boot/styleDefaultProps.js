import { QInput, QBtn, QSelect, QTable } from 'quasar';

// QInput.props.clearable = {
//   type: QInput.props.clearable,
//   default: true,
// };
// QInput.props.rounded = {
//   type: QInput.props.rounded,
//   default: true,
// };
QInput.props.outlined = {
  type: QInput.props.outlined,
  default: true,
};

// QInput.props.filled = {
//   type: QInput.props.filled,
//   default: true,
// };

// QSelect.props.filled = {
//   type: QSelect.props.filled,
//   default: true,
// };

QSelect.props.outlined = {
  type: QSelect.props.outlined,
  default: true,
};

QSelect.props.dense = {
  type: QSelect.props.dense,
  default: true,
};

QInput.props['bg-color'] = {
  type: QInput.props['bg-color'],
  default: 'grey-3',
};

QSelect.props['bg-color'] = {
  type: QSelect.props['bg-color'],
  default: 'grey-3',
};

QInput.props['lazy-rules'] = {
  type: QInput.props['lazy-rules'],
  default: true,
};

QInput.props.dense = {
  type: QInput.props.dense,
  default: true,
};

QBtn.props.rounded = {
  type: QBtn.props.rounded,
  default: true,
};

QBtn.props.color = {
  type: QBtn.props.color,
  default: 'primary',
};

QBtn.props.unelevated = {
  type: QBtn.props.unelevated,
  default: true,
};

QTable.props.flat = {
  type: QTable.props.flat,
  default: true,
};

QTable.props.selectedRowsLabel = {
  type: QTable.props.selectedRowsLabel,
  default: () => '',
};

QTable.props.rowsPerPageOptions = {
  type: Array,
  default: [10, 25, 50, 100],
};

//to override the active links color
// QItem.props['active-class'] = {
//   type: QItem.props['active-class'],
//   default: 'text-grey-14',
// };
