import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const RawHeaders = createParamDecorator((data, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest()
    const rawHeaders = req.rawHeaders;
    console.log({rawHeaders: rawHeaders});

    if(!rawHeaders) throw new InternalServerErrorException('Headers not found (request)');
    return rawHeaders;
});