import { PrettyDatePipe } from './pretty-date.pipe';

describe('PrettyDatePipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyDatePipe();
    expect(pipe).toBeTruthy();
  });
});
