// Generated by dts-bundle v0.7.3

/**
 * Wrapper for easier calling of the OneNote APIs.
 */
export class OneNoteApi extends OneNoteApiBase implements IOneNoteApi {
        constructor(authHeader: string, timeout?: number, headers?: {
                [key: string]: string;
        }, oneNoteApiHostOverride?: string, queryParams?: {
                [key: string]: string;
        });
        /**
         * CreateNotebook
         */
        createNotebook(name: string): Promise<ResponsePackage<any>>;
        /**
         * CreatePage
         */
        createPage(page: OneNotePage, sectionId?: string): Promise<ResponsePackage<any>>;
        /**
         * GetRecentNotebooks
         */
        getRecentNotebooks(includePersonal: boolean): Promise<ResponsePackage<any>>;
        /**
         * GetWopiProperties
         */
        getNotebookWopiProperties(notebookSelfPath: string, frameAction: string): Promise<ResponsePackage<any>>;
        /**
         * GetNotebooksFromWebUrls
         */
        getNotebooksFromWebUrls(notebookWebUrls: string[]): Promise<ResponsePackage<any>>;
        /**
            * SendBatchRequest
            **/
        sendBatchRequest(batchRequest: BatchRequest): Promise<ResponsePackage<any>>;
        /**
            * GetPage
            */
        getPage(pageId: string): Promise<ResponsePackage<any>>;
        /**
            * GetPageContent
            */
        getPageContent(pageId: string): Promise<ResponsePackage<any>>;
        /**
            * GetPages
            */
        getPages(options: {
                top?: number;
                sectionId?: string;
        }): Promise<ResponsePackage<any>>;
        /**
            * UpdatePage
            */
        updatePage(pageId: string, revisions: Revision[]): Promise<ResponsePackage<any>>;
        /**
         * CreateSection
         */
        createSection(notebookId: string, name: string): Promise<ResponsePackage<any>>;
        /**
         * CreateSectionUnderSectionGroup
         */
        createSectionUnderSectionGroup(sectionGroupId: string, name: string): Promise<ResponsePackage<any>>;
        /**
         * GetNotebooks
         */
        getNotebooks(excludeReadOnlyNotebooks?: boolean): Promise<ResponsePackage<any>>;
        /**
         * GetNotebooksWithExpandedSections
         */
        getNotebooksWithExpandedSections(expands?: number, excludeReadOnlyNotebooks?: boolean): Promise<ResponsePackage<any>>;
        /**
         * GetNotebooksWithExpandedSections
         */
        getNotebookBySelfUrl(selfUrl: string, expands?: number): Promise<ResponsePackage<any>>;
        /**
         * GetNotebookbyName
         */
        getNotebookByName(name: string): Promise<ResponsePackage<any>>;
        /**
         * GetDefaultNotebook
         */
        getDefaultNotebook(): Promise<ResponsePackage<any>>;
        /**
         * PagesSearch
         */
        pagesSearch(query: string): Promise<ResponsePackage<any>>;
        /**
         * Method that can be used to send any HTTP request
         */
        performApiCall(url: string, data?: XHRData, contentType?: string, httpMethod?: string, isFullUrl?: boolean, urlContainsVersion?: boolean): Promise<ResponsePackage<any>>;
        /**
         * Get site information for a site
         */
        getSiteLocationFromUrl(url: string): Promise<ResponsePackage<any>>;
        /**
         * create a group notebook
         */
        createGroupNotebook(name: string, groupId: string): Promise<ResponsePackage<any>>;
}

export interface IOneNoteApi {
    createNotebook(name: string): Promise<ResponsePackage<any>>;
    createPage(page: OneNotePage, sectionId?: string): Promise<ResponsePackage<any>>;
    sendBatchRequest(batchRequest: BatchRequest): Promise<ResponsePackage<any>>;
    getPage(pageId: string): Promise<ResponsePackage<any>>;
    getPageContent(pageId: string): Promise<ResponsePackage<any>>;
    getPages(options: {
        top?: number;
        sectionId?: string;
    }): Promise<ResponsePackage<any>>;
    updatePage(pageId: string, revisions: Revision[]): Promise<ResponsePackage<any>>;
    createSection(notebookId: string, name: string): Promise<ResponsePackage<any>>;
    createSectionUnderSectionGroup(sectionGroupId: string, name: string): Promise<ResponsePackage<any>>;
    getNotebooks(excludeReadOnlyNotebooks?: boolean): Promise<ResponsePackage<any>>;
    getNotebooksWithExpandedSections(expands?: number, excludeReadOnlyNotebooks?: boolean): Promise<ResponsePackage<any>>;
    getNotebookByName(name: string): Promise<ResponsePackage<any>>;
    pagesSearch(query: string): Promise<ResponsePackage<any>>;
}

export type XHRData = ArrayBufferView | Blob | Document | string | FormData;
export interface ResponsePackage<T> {
    parsedResponse: T;
    request: XMLHttpRequest;
}
/**
 * Base communication layer for talking to the OneNote APIs.
 */
export class OneNoteApiBase {
    useBetaApi: boolean;
    constructor(authHeader: string, timeout: number, headers?: {
        [key: string]: string;
    }, oneNoteApiHostOverride?: string, queryParams?: {
        [key: string]: string;
    });
    protected requestPromise(url: string, data?: XHRData, contentType?: string, httpMethod?: string, isFullUrl?: boolean, urlContainsVersion?: boolean): Promise<ResponsePackage<any>>;
    generateFullUrl(partialUrl: string, urlContainsVersion?: boolean): string;
    generateFullMeNotesUrl(partialUrl: string, urlContainsVersion?: boolean): string;
}

/**
    * The page payload consists of multiple data parts. The first data part is the 'Presentation'
    * that describes the elements that render on the page itself as ONML. Subsequent data parts are referenced
    * by the Presentation, e.g. binary data.
    */
export class OneNotePage {
        constructor(title?: string, presentationBody?: string, locale?: string, pageMetadata?: {
                [key: string]: string;
        });
        /**
            * Includes everything inside and including the <html> tags
            */
        getEntireOnml(): string;
        escapeHtmlEntities(value: string): string;
        /**
            * Converts the Presentation and subsequent data parts entirely into data parts
            */
        getTypedFormData(): TypedFormData;
        addOnml(onml: string): void;
        addHtml(html: string): string;
        addImage(imgUrl: string): void;
        /**
            * The input can either be a url, or a reference to a MIME part containing binary
            * e.g., "name:REFERENCE"
            */
        addObjectUrlAsImage(url: string): void;
        addAttachment(binary: ArrayBuffer, name: string): string;
        addUrl(url: string): void;
        addCitation(format: string, urlToDisplay: string, rawUrl?: string): void;
}

/**
  * The BATCH API allows a user to execute multiple OneNoteApi actions in a single HTTP request.
  * For example, sending two PATCHES in the same HTTP request
  * To use, construct a new BatchRequest and then pass in an object that adheres to the BatchRequestOperation interface into
  * 	BatchRequest::addOperation(...). Once the request is built, send it using OneNoteApi::sendBatchRequest(...)
  */
export class BatchRequest {
    constructor();
    addOperation(op: BatchRequestOperation): void;
    getOperation(index: number): BatchRequestOperation;
    getNumOperations(): number;
    getRequestBody(): string;
    getContentType(): string;
}

export interface Identifyable {
    id: string;
    self: string;
}
export interface HistoryTime {
    createdTime: Date;
    lastModifiedTime: Date;
}
export interface HistoryBy {
    createdBy: string;
    lastModifiedBy: string;
}
export interface SectionAndSectionGroupParent {
    sectionsUrl: string;
    sectionGroupsUrl: string;
    sections: Section[];
    sectionGroups: SectionGroup[];
}
export interface PageParent {
    pagesUrl: string;
    pages: Page[];
}
export module Revision {
    enum Action {
        append = 0,
        insert = 1,
        prepend = 2,
        replace = 3,
    }
    enum Position {
        after = 0,
        before = 1,
    }
}
export interface BatchRequestOperation {
    httpMethod: string;
    uri: string;
    contentType: string;
    content?: string;
}
export interface Revision {
    target: string;
    action: Revision.Action;
    content: string;
    position?: Revision.Position;
}
export interface Notebook extends Identifyable, HistoryTime, HistoryBy, SectionAndSectionGroupParent {
    name: string;
    isDefault: boolean;
    userRole: Object;
    isShared: boolean;
    links: {
        oneNoteClientUrl: {
            href: string;
        };
        oneNoteWebUrl: {
            href: string;
        };
    };
}
export interface SectionGroup extends Identifyable, HistoryTime, HistoryBy, SectionAndSectionGroupParent {
    name: string;
}
export interface Section extends Identifyable, HistoryTime, HistoryBy, PageParent {
    name: string;
    isDefault: boolean;
    parentNotebook?: Notebook;
}
export interface Page extends Identifyable, HistoryTime {
    title: string;
    contentUrl: string;
    createdByAppId: string;
    links: {
        oneNoteClientUrl: {
            href: string;
        };
        oneNoteWebUrl: {
            href: string;
        };
    };
    thumbnailUrl: string;
}

export enum ContentType {
    Html = 0,
    Image = 1,
    EnhancedUrl = 2,
    Url = 3,
    Onml = 4,
}

export enum RequestErrorType {
        NETWORK_ERROR = 0,
        UNEXPECTED_RESPONSE_STATUS = 1,
        REQUEST_TIMED_OUT = 2,
        UNABLE_TO_PARSE_RESPONSE = 3,
}
export interface GenericError {
        error: string;
}
export interface RequestError extends GenericError {
        timeout?: number;
        statusCode: number;
        response: string;
        responseHeaders: {
                [key: string]: string;
        };
}
export class ErrorUtils {
        static createRequestErrorObject(request: XMLHttpRequest, errorType: RequestErrorType): RequestError;
        /**
            * Split out for unit testing purposes.
            * Meant only to be called by ErrorUtils.createRequestErrorObject and UTs.
            */
        static createRequestErrorObjectInternal(status: number, readyState: number, response: any, responseHeaders: string, timeout: number, errorType: RequestErrorType): RequestError;
        static convertResponseHeadersToJson(request: XMLHttpRequest): {
                [key: string]: string;
        };
        /**
            * Split out for unit testing purposes.
            * Meant only to be called by ErrorUtils.convertResponseHeadersToJson, ErrorUtils.createRequestErrorObject, and UTs.
            */
        static convertResponseHeadersToJsonInternal(responseHeaders: string): {
                [key: string]: string;
        };
}

export type Blobbable = string | ArrayBuffer;
export interface DataPart {
    name: string;
    content: Blobbable;
    type: string;
}
export class TypedFormData {
    constructor();
    getContentType(): string;
    append(name: string, content: Blobbable, type: string): void;
    asBlob(): Blob;
}

