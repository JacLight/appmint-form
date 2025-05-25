// Import common components
import { CustomFileUpload } from "./common/common-file-upload";

// Import all form elements individually
import { ButtonElement } from './form-elements/button-element';
import { CaptureElement } from './form-elements/capture-element';
import { CodeElement } from './form-elements/code-element';
import { ColorElement } from './form-elements/color-element';
import { CronElement } from './form-elements/cron-element';
import { DataLookupCombo } from './form-elements/data-lookup-combo';
import { DataViewElement } from './form-elements/data-view-element';
import { DateElement } from './form-elements/date-element';
import { DateRangeElement } from './form-elements/date-range';
import { DateTimePicker } from './form-elements/date-time-picker';
import { FileElement } from './form-elements/file-element';
import { FontPickerElement } from './form-elements/font-picker-element';
import { GeneratedElement } from './form-elements/generated-element';
import { IconPickerElement } from './form-elements/icon-picker-element';
import { LabelElement } from './form-elements/label-element';
import { LegalConsentElement } from './form-elements/legal-concent';
import { MapElementNew } from './form-elements/map-element-new';
import { MarkdownElement } from './form-elements/markdown-element';
import { NoticeElement } from './form-elements/notice-element';
import { NumberElement } from './form-elements/number-element';
import { NumberRangeElement } from './form-elements/number-range-element';
import { ParagraphElement } from './form-elements/paragraph-element';
import { PhoneElement } from './form-elements/phone';
import { PreviewElement } from './form-elements/preview-element';
import { QuestionElement } from './form-elements/question-element';
import { RankingInput } from './form-elements/ranking';
import { RatingInput } from './form-elements/rating';
import { RichtextElement } from './form-elements/richtext-element';
import { SelectManyCheckbox } from './form-elements/select-many-checkbox';
import { SelectManyCombo } from './form-elements/select-many-combo';
import { SelectManyElement } from './form-elements/select-many-element';
import { SelectManyList } from './form-elements/select-many-list';
import { SelectManyRadio } from './form-elements/select-many-radio';
import { SelectSingleElement } from './form-elements/select-single-element';
import { ShadowElement } from './form-elements/shadow-element';
import { SignatureElement } from './form-elements/signature-element';
import { SliderElement } from './form-elements/slider';
import { SliderRangeElement } from './form-elements/slider-range';
import { SocialTextArea } from './form-elements/social-textarea';
import { SwitchElement } from './form-elements/switch-element';
import { TextElement } from './form-elements/text-element';
import { UuidElement } from './form-elements/uuid-element';

// Import styling components and utilities
import { StyledComponent } from './form-elements/styling';
import { extractStylingFromSchema, getComponentPartStyling } from './form-elements/styling/style-utils';

// Export all components
export {
    // Common components
    CustomFileUpload,
    
    // Form elements
    ButtonElement,
    CaptureElement,
    CodeElement,
    ColorElement,
    CronElement,
    DataLookupCombo,
    DataViewElement,
    DateElement,
    DateRangeElement,
    DateTimePicker,
    FileElement,
    FontPickerElement,
    GeneratedElement,
    IconPickerElement,
    LabelElement,
    LegalConsentElement,
    MapElementNew,
    MarkdownElement,
    NoticeElement,
    NumberElement,
    NumberRangeElement,
    ParagraphElement,
    PhoneElement,
    PreviewElement,
    QuestionElement,
    RankingInput,
    RatingInput,
    RichtextElement,
    SelectManyCheckbox,
    SelectManyCombo,
    SelectManyElement,
    SelectManyList,
    SelectManyRadio,
    SelectSingleElement,
    ShadowElement,
    SignatureElement,
    SliderElement,
    SliderRangeElement,
    SocialTextArea,
    SwitchElement,
    TextElement,
    UuidElement,
    
    // Styling components and utilities
    StyledComponent,
    extractStylingFromSchema,
    getComponentPartStyling
};

// Also export the element map from all-elements for backward compatibility
export { elementToNameMap } from './form-elements/all-elements';
