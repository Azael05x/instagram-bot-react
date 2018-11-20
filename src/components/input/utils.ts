export enum InputType {
    Email = "email",
    Text = "text",
    Number = "number",
    Telephone = "tel",
    Password = "password",
}
export const labelTextMap = {
    [InputType.Email]: "email",
    [InputType.Text]: "text",
    [InputType.Number]: "number",
    [InputType.Telephone]: "telephone",
    [InputType.Password]: "password",
};
