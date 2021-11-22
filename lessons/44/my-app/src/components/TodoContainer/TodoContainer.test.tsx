import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoContainer from './TodoContainer';

describe('TodoContainer', () => {
  const mockedStore = createStore((state) => state);
  const component = (
    <Provider store={mockedStore}>
      <TodoContainer />
    </Provider>
  );

  it('Render TodoContainer', () => {
    render(component);
    expect(screen.getByTestId('todo-container')).toBeInTheDocument();
  });
});