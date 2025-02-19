import type { ClassConstructor } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import type { ValidationError } from 'class-validator';
import { validateOrReject } from 'class-validator';

/**
 * @description DTO를 지정된 엔터티 클래스로 변환하고 유효성을 검증.
 */
export async function transformAndValidate<T>(entityClass: ClassConstructor<T>, dto: object): Promise<T> {
    // DTO -> 엔터티 변환
    const entity = plainToInstance(entityClass, dto);

    try {
        // 엔터티 유효성 검증
        await validateOrReject(entity as object);
    } catch (errors: any) {
        throw new Error(formatValidationErrors(errors));
    }

    return entity;
}

/**
 * @description ValidationError 배열을 보기 쉽게 문자열로 변환
 */
function formatValidationErrors(errors: ValidationError[]): string {
    return errors.map((error) => `${error.property} - ${Object.values(error.constraints || {}).join(', ')}`).join('; ');
}
