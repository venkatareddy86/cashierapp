import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  .panel-info-secondary {
    background: ${({ theme }) => theme.panelBody};
  }
  
.btn-primary,
.btn-primary.active,
.btn-primary:active,
.btn-primary:focus,
.btn-primary:hover,
.btn-group .btn-toggle-default.active,
.btn-primary.active.focus,
.btn-primary.active:focus,
.btn-primary.active:hover,
.btn-primary:active.focus,
.btn-primary:active:focus,
.btn-primary:active:hover,
.open>.dropdown-toggle.btn-primary.focus,
.open>.dropdown-toggle.btn-primary:focus,
.open>.dropdown-toggle.btn-primary:hover,
.btn-primary.disabled.focus,
.btn-primary.disabled:focus,
.btn-primary.disabled:hover,
.btn-primary[disabled].focus,
.btn-primary[disabled]:focus,
.btn-primary[disabled]:hover,
fieldset[disabled] .btn-primary.focus,
fieldset[disabled] .btn-primary:focus,
fieldset[disabled] .btn-primary:hover {
    color: #fff;
    background:${({ theme }) => theme.primaryButton};
    border-color: ${({ theme }) => theme.primaryButton};
}

.btn-secondary,
.btn-secondary.active,
.btn-secondary:active,
.btn-secondary:focus,
.btn-secondary:hover {
    background-image: none;
    background-color: ${({ theme }) => theme.secondaryButton};
}

`;