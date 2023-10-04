import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

// AAA Pattern -> Arrange, Act, Assert
 
describe('Home', () => {
  it('renders home component', () => {
    render(<Home />)
 
    const content = screen.getByTestId("handleSwitchVariablesProvider");
 
    expect(content).toBeInTheDocument()
  })
})