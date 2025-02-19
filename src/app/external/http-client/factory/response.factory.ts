import { ClassConstructor, plainToInstance } from 'class-transformer';

export class HttpClientResponseFactory {
    /**
     * HTTP response data를 엔티티로 변환
     * @param entityClass - 변환할 엔티티 클래스
     * @param plainObject - 변환할 원본 데이터
     * @param path - 데이터를 가져올 경로 (optional)
     */
    static toEntity<T>(entityClass: ClassConstructor<T>, plainObject: any, path?: string): T {
        const nestedData = path ? path.split('.').reduce((obj, key) => obj?.[key], plainObject) : plainObject;

        if (!nestedData || typeof nestedData !== 'object') {
            throw new Error('Invalid data for entity conversion');
        }

        return plainToInstance(entityClass, nestedData, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    /**
     * HTTP response data를 엔티티로 변환
     * @param path - 데이터를 가져올 경로 (e.g. "channels")
     */
    static toEntities<T>(entityClass: ClassConstructor<T>, plainObject: any, path: string): T[] {
        const nestedData = path.split('.').reduce((obj, key) => obj?.[key], plainObject);

        // 경로의 데이터가 배열이 아니라면 배열로 감싸 단일 객체도 처리
        const dataArray = Array.isArray(nestedData) ? nestedData : [nestedData];

        return plainToInstance(entityClass, dataArray, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}
