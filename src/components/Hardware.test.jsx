import { render, screen } from '@testing-library/react'
import Hardware from './Hardware'

test('renders content', () => {
  const hardware = {
    name: 'Component testing is done with react-testing-library'
  }

  render(<Hardware hardware={hardware} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})