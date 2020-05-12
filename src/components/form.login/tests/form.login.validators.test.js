import { validateChange, validateSubmit } from "../form.login.validators";
import { messages } from "../form.login.component";

describe("The validators should work as expected", () => {
  let success = jest.fn();
  let reject = jest.fn();
  beforeEach(() => {
    success.mockReset();
    reject.mockReset();
  });

  describe("give a change validator", () => {
    it("it should always returns success", () => {
      const result = validateChange("some data", success, reject);
      expect(success).toHaveBeenCalledWith("some data");
      expect(success.mock.calls.length).toBe(1);
      expect(reject.mock.calls.length).toBe(0);
      expect(result).toBe(true);
    });
  });

  describe("give a submit validator", () => {
    it("it should return success on proper names", () => {
      const result = validateSubmit("proper name", success, reject);
      expect(success).toHaveBeenCalledWith("proper name");
      expect(success.mock.calls.length).toBe(1);
      expect(reject.mock.calls.length).toBe(0);
      expect(result).toBe(true);
    });

    it("it should return failure on a missing name", () => {
      const result = validateSubmit("", success, reject);
      expect(reject).toHaveBeenCalledWith(
        messages.FormUserNameMissingValidation
      );
      expect(success.mock.calls.length).toBe(0);
      expect(reject.mock.calls.length).toBe(1);
      expect(result).toBe(false);
    });
  });
});
