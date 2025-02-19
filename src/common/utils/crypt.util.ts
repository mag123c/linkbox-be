import { v4 as uuidv4 } from 'uuid';

/**
 * UUID v8 생성 함수
 * (UUID v4를 기반으로 특정 비트를 변경)
 */
export function generateUUIDv8(): string {
    let uuid = uuidv4();
    uuid = uuid.replace(/^(.{14})4/, '$18');

    return uuid;
}
