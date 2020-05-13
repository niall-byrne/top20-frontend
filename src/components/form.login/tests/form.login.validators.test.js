import { validateChange, validateSubmit } from "../form.login.validators";
import messages from "../../../configuration/messages";

describe("The validators should work as expected", () => {
  let reject = jest.fn();
  beforeEach(() => {
    reject.mockReset();
  });

  describe("give a change validator", () => {
    it("should always return success", () => {
      const result = validateChange("some data", reject);
      expect(reject.mock.calls.length).toBe(0);
      expect(result).toBe(true);
    });
  });

  describe("give a submit validator", () => {
    it("should not reject proper names", () => {
      const result = validateSubmit("proper name", reject);
      expect(reject.mock.calls.length).toBe(0);
      expect(result).toBe(true);
    });

    it("should return failure on a missing name", () => {
      const result = validateSubmit("", reject);
      expect(reject).toHaveBeenCalledWith(
        messages.FormUserNameMissingValidation
      );
      expect(reject.mock.calls.length).toBe(1);
      expect(result).toBe(false);
    });
  });
});
