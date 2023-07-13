import { styled } from 'styled-components';

const SwatchesWrapper = styled.div`
  padding: 16px 0;

  &:first-child {
    padding-top: 0;
  }

  &:not(:first-child) {
    border-top: 1px solid var(--clr-modal-divider);
  }

  .swatch-list {
    display: flex;
    gap: 10px;
    flex-flow: row wrap;
    margin-top: 5px;
  }

  .swatch-item {
    flex: 0 0 calc(20% - 10px);
    position: relative;

    &[class^='theme'],
    &[class*=' theme'] {
      .swatch-background {
        background-color: var(--clr-primary-6);
      }
    }

    &[class^='texture'],
    &[class*=' texture'] {
      background-color: var(--clr-body-background);

      .swatch-background {
        background-color: var(--clr-text);
        -webkit-mask-image: var(--clr-texture-image);
        -webkit-mask-size: cover;
        -webkit-mask-position: center;
        mask-image: var(--clr-texture-image);
        mask-size: cover;
        mask-position: center;
      }
    }
  }

  .swatch-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .swatch-button {
    display: block;
    font-size: 40px;
    line-height: 0;
    padding: 0;
    position: relative;
    width: 100%;

    &::after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      padding-bottom: 100%;
    }

    svg {
      vertical-align: middle;
    }
  }
`;

export default SwatchesWrapper;
