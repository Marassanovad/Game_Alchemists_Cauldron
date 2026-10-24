export type ParameterType = 'temperature' | 'density' | 'magic-power';

interface IParameterBarProperties {
  type: ParameterType;
  label: string;
  icon: string;
  value: number;
  min: number;
  max: number;
}

export function ParameterBar({
  type,
  label,
  icon,
  value,
  min,
  max,
}: IParameterBarProperties): HTMLDivElement {
  const bar = document.createElement('div');
  bar.className = `parameter-bar parameter-bar--${type}`;

  const isInRange = value >= min && value <= max;

  if (isInRange) {
    bar.classList.add('parameter-bar--in-range');
  }

  const header = document.createElement('div');
  header.className = 'parameter-bar__header';

  const title = document.createElement('div');
  title.className = 'parameter-bar__title';

  const iconElement = document.createElement('span');
  iconElement.className = 'parameter-bar__icon';
  iconElement.textContent = icon;
  iconElement.setAttribute('aria-hidden', 'true');

  const labelElement = document.createElement('span');
  labelElement.className = 'parameter-bar__label';
  labelElement.textContent = label;

  title.append(iconElement, labelElement);

  const valueElement = document.createElement('span');
  valueElement.className = 'parameter-bar__value';
  valueElement.textContent = String(value);

  header.append(title, valueElement);

  const track = document.createElement('div');
  track.className = 'parameter-bar__track';
  track.setAttribute('role', 'progressbar');
  track.setAttribute('aria-label', label);
  track.setAttribute('aria-valuenow', String(value));
  track.setAttribute('aria-valuemin', String(min));
  track.setAttribute('aria-valuemax', String(max));

  const rangeWidth = Math.max(max - min, 1);
  const scaleMin = min - rangeWidth * 2;
  const scaleMax = max + rangeWidth * 2;

  const position = ((value - scaleMin) / (scaleMax - scaleMin)) * 100;

  const markerPosition = Math.max(0, Math.min(100, position));

  const range = document.createElement('div');
  range.className = 'parameter-bar__range';

  const marker = document.createElement('div');
  marker.className = 'parameter-bar__marker';
  marker.style.left = `${markerPosition}%`;

  const markerArrow = document.createElement('span');
  markerArrow.className = 'parameter-bar__marker-arrow';
  markerArrow.setAttribute('aria-hidden', 'true');
  markerArrow.textContent = '▼';

  marker.append(markerArrow);
  track.append(range, marker);

  const footer = document.createElement('div');
  footer.className = 'parameter-bar__footer';

  const rangeLabel = document.createElement('span');
  rangeLabel.className = 'parameter-bar__range-label';
  rangeLabel.textContent = `Recipe range: ${min}–${max}`;

  footer.append(rangeLabel);
  bar.append(header, track, footer);

  return bar;
}
