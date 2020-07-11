export class SetDarkMode {
    static readonly type = '[AppSettings] Dark mode toggle';
    constructor(public isEnabled: boolean) {}
}
