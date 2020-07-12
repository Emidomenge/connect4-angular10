export class SetDarkMode {
    static readonly type = '[AppSettings] Dark mode toggle';
    constructor(public isEnabled: boolean) {}
}

export class SwitchSoundToMute {
    static readonly type = '[AppSettings] Sound toggle';
    constructor(public value: boolean) {}
}
