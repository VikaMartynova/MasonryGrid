import styled from 'styled-components'

export interface HeaderPropsType {
  color?: string
  title: string
}

const HeaderWrapper = styled.header<{ color?: string }>`
  h1 {
    margin-top: 16px;
    font-weight: 700;
    color: ${({ color }) => `${color}` || '#000'};
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
`

export const Header = ({ title, color }: HeaderPropsType) => {
  return (
    <HeaderWrapper color={color}>
      <h1>{title}</h1>
    </HeaderWrapper>
  )
}
