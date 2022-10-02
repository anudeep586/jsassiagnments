export class cError {
    msg: string;
    status: number;
    constructor(msg: string, status: number) {
        this.msg = msg;
        this.status = status
    }
}
export class notFoundError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}
export class aError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}
export class mandatoryFieldError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class MyError extends Error {
    status: number;
    constructor(data: { status: number; message: string; }) {
        super(data.message);
        this.status = data.status;
    }
}