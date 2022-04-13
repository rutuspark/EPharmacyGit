package com.cdac.epharmacy.dto;

import com.cdac.epharmacy.models.PaymentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubmitOrder {
	private long orderId;
	private PaymentType paymentType;
}
